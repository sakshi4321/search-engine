import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  SearchQuery,
  SearchQueryDomainFacade,
} from '@server/modules/searchQuery/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SearchQueryApplicationEvent } from './searchQuery.application.event'
import { SearchQueryCreateDto, SearchQueryUpdateDto } from './searchQuery.dto'

@Controller('/v1/searchQuerys')
export class SearchQueryController {
  constructor(
    private eventService: EventService,
    private searchQueryDomainFacade: SearchQueryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.searchQueryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SearchQueryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.searchQueryDomainFacade.create(body)

    await this.eventService.emit<SearchQueryApplicationEvent.SearchQueryCreated.Payload>(
      SearchQueryApplicationEvent.SearchQueryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:searchQueryId')
  async findOne(
    @Param('searchQueryId') searchQueryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.searchQueryDomainFacade.findOneByIdOrFail(
      searchQueryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:searchQueryId')
  async update(
    @Param('searchQueryId') searchQueryId: string,
    @Body() body: SearchQueryUpdateDto,
  ) {
    const item =
      await this.searchQueryDomainFacade.findOneByIdOrFail(searchQueryId)

    const itemUpdated = await this.searchQueryDomainFacade.update(
      item,
      body as Partial<SearchQuery>,
    )
    return itemUpdated
  }

  @Delete('/:searchQueryId')
  async delete(@Param('searchQueryId') searchQueryId: string) {
    const item =
      await this.searchQueryDomainFacade.findOneByIdOrFail(searchQueryId)

    await this.searchQueryDomainFacade.delete(item)

    return item
  }
}

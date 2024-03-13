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
  SearchResult,
  SearchResultDomainFacade,
} from '@server/modules/searchResult/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SearchResultApplicationEvent } from './searchResult.application.event'
import {
  SearchResultCreateDto,
  SearchResultUpdateDto,
} from './searchResult.dto'

@Controller('/v1/searchResults')
export class SearchResultController {
  constructor(
    private eventService: EventService,
    private searchResultDomainFacade: SearchResultDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.searchResultDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SearchResultCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.searchResultDomainFacade.create(body)

    await this.eventService.emit<SearchResultApplicationEvent.SearchResultCreated.Payload>(
      SearchResultApplicationEvent.SearchResultCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:searchResultId')
  async findOne(
    @Param('searchResultId') searchResultId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.searchResultDomainFacade.findOneByIdOrFail(
      searchResultId,
      queryOptions,
    )

    return item
  }

  @Patch('/:searchResultId')
  async update(
    @Param('searchResultId') searchResultId: string,
    @Body() body: SearchResultUpdateDto,
  ) {
    const item =
      await this.searchResultDomainFacade.findOneByIdOrFail(searchResultId)

    const itemUpdated = await this.searchResultDomainFacade.update(
      item,
      body as Partial<SearchResult>,
    )
    return itemUpdated
  }

  @Delete('/:searchResultId')
  async delete(@Param('searchResultId') searchResultId: string) {
    const item =
      await this.searchResultDomainFacade.findOneByIdOrFail(searchResultId)

    await this.searchResultDomainFacade.delete(item)

    return item
  }
}

import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SearchResultDomainFacade } from '@server/modules/searchResult/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SearchResultApplicationEvent } from './searchResult.application.event'
import { SearchResultCreateDto } from './searchResult.dto'

import { SearchQueryDomainFacade } from '../../searchQuery/domain'

@Controller('/v1/searchQuerys')
export class SearchResultBySearchQueryController {
  constructor(
    private searchQueryDomainFacade: SearchQueryDomainFacade,

    private searchResultDomainFacade: SearchResultDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/searchQuery/:searchQueryId/searchResults')
  async findManySearchQueryId(
    @Param('searchQueryId') searchQueryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.searchQueryDomainFacade.findOneByIdOrFail(searchQueryId)

    const items = await this.searchResultDomainFacade.findManyBySearchQuery(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/searchQuery/:searchQueryId/searchResults')
  async createBySearchQueryId(
    @Param('searchQueryId') searchQueryId: string,
    @Body() body: SearchResultCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, searchQueryId }

    const item = await this.searchResultDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SearchResultApplicationEvent.SearchResultCreated.Payload>(
      SearchResultApplicationEvent.SearchResultCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

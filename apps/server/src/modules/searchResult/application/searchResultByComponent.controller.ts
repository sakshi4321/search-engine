import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SearchResultDomainFacade } from '@server/modules/searchResult/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SearchResultApplicationEvent } from './searchResult.application.event'
import { SearchResultCreateDto } from './searchResult.dto'

import { ComponentDomainFacade } from '../../component/domain'

@Controller('/v1/components')
export class SearchResultByComponentController {
  constructor(
    private componentDomainFacade: ComponentDomainFacade,

    private searchResultDomainFacade: SearchResultDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/component/:componentId/searchResults')
  async findManyComponentId(
    @Param('componentId') componentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.componentDomainFacade.findOneByIdOrFail(componentId)

    const items = await this.searchResultDomainFacade.findManyByComponent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/component/:componentId/searchResults')
  async createByComponentId(
    @Param('componentId') componentId: string,
    @Body() body: SearchResultCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, componentId }

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

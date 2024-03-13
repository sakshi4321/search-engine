import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SearchQueryDomainFacade } from '@server/modules/searchQuery/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SearchQueryApplicationEvent } from './searchQuery.application.event'
import { SearchQueryCreateDto } from './searchQuery.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class SearchQueryByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private searchQueryDomainFacade: SearchQueryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/searchQuerys')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.searchQueryDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/searchQuerys')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: SearchQueryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.searchQueryDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SearchQueryApplicationEvent.SearchQueryCreated.Payload>(
      SearchQueryApplicationEvent.SearchQueryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

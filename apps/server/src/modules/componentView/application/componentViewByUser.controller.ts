import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ComponentViewDomainFacade } from '@server/modules/componentView/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ComponentViewApplicationEvent } from './componentView.application.event'
import { ComponentViewCreateDto } from './componentView.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ComponentViewByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private componentViewDomainFacade: ComponentViewDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/componentViews')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.componentViewDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/componentViews')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ComponentViewCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.componentViewDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ComponentViewApplicationEvent.ComponentViewCreated.Payload>(
      ComponentViewApplicationEvent.ComponentViewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

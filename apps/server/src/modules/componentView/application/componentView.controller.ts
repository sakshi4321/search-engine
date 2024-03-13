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
  ComponentView,
  ComponentViewDomainFacade,
} from '@server/modules/componentView/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ComponentViewApplicationEvent } from './componentView.application.event'
import {
  ComponentViewCreateDto,
  ComponentViewUpdateDto,
} from './componentView.dto'

@Controller('/v1/componentViews')
export class ComponentViewController {
  constructor(
    private eventService: EventService,
    private componentViewDomainFacade: ComponentViewDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.componentViewDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ComponentViewCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.componentViewDomainFacade.create(body)

    await this.eventService.emit<ComponentViewApplicationEvent.ComponentViewCreated.Payload>(
      ComponentViewApplicationEvent.ComponentViewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:componentViewId')
  async findOne(
    @Param('componentViewId') componentViewId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.componentViewDomainFacade.findOneByIdOrFail(
      componentViewId,
      queryOptions,
    )

    return item
  }

  @Patch('/:componentViewId')
  async update(
    @Param('componentViewId') componentViewId: string,
    @Body() body: ComponentViewUpdateDto,
  ) {
    const item =
      await this.componentViewDomainFacade.findOneByIdOrFail(componentViewId)

    const itemUpdated = await this.componentViewDomainFacade.update(
      item,
      body as Partial<ComponentView>,
    )
    return itemUpdated
  }

  @Delete('/:componentViewId')
  async delete(@Param('componentViewId') componentViewId: string) {
    const item =
      await this.componentViewDomainFacade.findOneByIdOrFail(componentViewId)

    await this.componentViewDomainFacade.delete(item)

    return item
  }
}

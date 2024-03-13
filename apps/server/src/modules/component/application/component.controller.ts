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
  Component,
  ComponentDomainFacade,
} from '@server/modules/component/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ComponentApplicationEvent } from './component.application.event'
import { ComponentCreateDto, ComponentUpdateDto } from './component.dto'

@Controller('/v1/components')
export class ComponentController {
  constructor(
    private eventService: EventService,
    private componentDomainFacade: ComponentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.componentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ComponentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.componentDomainFacade.create(body)

    await this.eventService.emit<ComponentApplicationEvent.ComponentCreated.Payload>(
      ComponentApplicationEvent.ComponentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:componentId')
  async findOne(
    @Param('componentId') componentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.componentDomainFacade.findOneByIdOrFail(
      componentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:componentId')
  async update(
    @Param('componentId') componentId: string,
    @Body() body: ComponentUpdateDto,
  ) {
    const item = await this.componentDomainFacade.findOneByIdOrFail(componentId)

    const itemUpdated = await this.componentDomainFacade.update(
      item,
      body as Partial<Component>,
    )
    return itemUpdated
  }

  @Delete('/:componentId')
  async delete(@Param('componentId') componentId: string) {
    const item = await this.componentDomainFacade.findOneByIdOrFail(componentId)

    await this.componentDomainFacade.delete(item)

    return item
  }
}

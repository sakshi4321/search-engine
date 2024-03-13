import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ComponentDomainFacade } from './component.domain.facade'
import { Component } from './component.model'

@Module({
  imports: [TypeOrmModule.forFeature([Component]), DatabaseHelperModule],
  providers: [ComponentDomainFacade, ComponentDomainFacade],
  exports: [ComponentDomainFacade],
})
export class ComponentDomainModule {}

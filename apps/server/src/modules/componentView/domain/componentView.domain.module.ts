import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ComponentViewDomainFacade } from './componentView.domain.facade'
import { ComponentView } from './componentView.model'

@Module({
  imports: [TypeOrmModule.forFeature([ComponentView]), DatabaseHelperModule],
  providers: [ComponentViewDomainFacade, ComponentViewDomainFacade],
  exports: [ComponentViewDomainFacade],
})
export class ComponentViewDomainModule {}

import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ComponentDomainModule } from '../domain'
import { ComponentController } from './component.controller'

@Module({
  imports: [AuthenticationDomainModule, ComponentDomainModule],
  controllers: [ComponentController],
  providers: [],
})
export class ComponentApplicationModule {}

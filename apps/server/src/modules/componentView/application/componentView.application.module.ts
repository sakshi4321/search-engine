import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ComponentViewDomainModule } from '../domain'
import { ComponentViewController } from './componentView.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ComponentViewByUserController } from './componentViewByUser.controller'

import { ComponentDomainModule } from '../../../modules/component/domain'

import { ComponentViewByComponentController } from './componentViewByComponent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ComponentViewDomainModule,

    UserDomainModule,

    ComponentDomainModule,
  ],
  controllers: [
    ComponentViewController,

    ComponentViewByUserController,

    ComponentViewByComponentController,
  ],
  providers: [],
})
export class ComponentViewApplicationModule {}

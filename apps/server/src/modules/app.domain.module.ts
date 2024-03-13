import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ComponentDomainModule } from './component/domain'

import { SearchQueryDomainModule } from './searchQuery/domain'

import { SearchResultDomainModule } from './searchResult/domain'

import { ComponentViewDomainModule } from './componentView/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ComponentDomainModule,

    SearchQueryDomainModule,

    SearchResultDomainModule,

    ComponentViewDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}

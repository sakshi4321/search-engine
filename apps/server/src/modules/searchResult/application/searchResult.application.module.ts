import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SearchResultDomainModule } from '../domain'
import { SearchResultController } from './searchResult.controller'

import { SearchQueryDomainModule } from '../../../modules/searchQuery/domain'

import { SearchResultBySearchQueryController } from './searchResultBySearchQuery.controller'

import { ComponentDomainModule } from '../../../modules/component/domain'

import { SearchResultByComponentController } from './searchResultByComponent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SearchResultDomainModule,

    SearchQueryDomainModule,

    ComponentDomainModule,
  ],
  controllers: [
    SearchResultController,

    SearchResultBySearchQueryController,

    SearchResultByComponentController,
  ],
  providers: [],
})
export class SearchResultApplicationModule {}

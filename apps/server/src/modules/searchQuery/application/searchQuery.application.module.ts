import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SearchQueryDomainModule } from '../domain'
import { SearchQueryController } from './searchQuery.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { SearchQueryByUserController } from './searchQueryByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SearchQueryDomainModule,

    UserDomainModule,
  ],
  controllers: [SearchQueryController, SearchQueryByUserController],
  providers: [],
})
export class SearchQueryApplicationModule {}

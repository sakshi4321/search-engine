import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SearchQueryDomainFacade } from './searchQuery.domain.facade'
import { SearchQuery } from './searchQuery.model'

@Module({
  imports: [TypeOrmModule.forFeature([SearchQuery]), DatabaseHelperModule],
  providers: [SearchQueryDomainFacade, SearchQueryDomainFacade],
  exports: [SearchQueryDomainFacade],
})
export class SearchQueryDomainModule {}

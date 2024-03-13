import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SearchResultDomainFacade } from './searchResult.domain.facade'
import { SearchResult } from './searchResult.model'

@Module({
  imports: [TypeOrmModule.forFeature([SearchResult]), DatabaseHelperModule],
  providers: [SearchResultDomainFacade, SearchResultDomainFacade],
  exports: [SearchResultDomainFacade],
})
export class SearchResultDomainModule {}

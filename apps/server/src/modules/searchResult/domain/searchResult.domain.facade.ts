import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { SearchResult } from './searchResult.model'

import { SearchQuery } from '../../searchQuery/domain'

import { Component } from '../../component/domain'

@Injectable()
export class SearchResultDomainFacade {
  constructor(
    @InjectRepository(SearchResult)
    private repository: Repository<SearchResult>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<SearchResult>): Promise<SearchResult> {
    return this.repository.save(values)
  }

  async update(
    item: SearchResult,
    values: Partial<SearchResult>,
  ): Promise<SearchResult> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: SearchResult): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<SearchResult> = {},
  ): Promise<SearchResult[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<SearchResult> = {},
  ): Promise<SearchResult> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyBySearchQuery(
    item: SearchQuery,
    queryOptions: RequestHelper.QueryOptions<SearchResult> = {},
  ): Promise<SearchResult[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('searchQuery')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        searchQueryId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByComponent(
    item: Component,
    queryOptions: RequestHelper.QueryOptions<SearchResult> = {},
  ): Promise<SearchResult[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('component')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        componentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { ComponentView } from './componentView.model'

import { User } from '../../user/domain'

import { Component } from '../../component/domain'

@Injectable()
export class ComponentViewDomainFacade {
  constructor(
    @InjectRepository(ComponentView)
    private repository: Repository<ComponentView>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<ComponentView>): Promise<ComponentView> {
    return this.repository.save(values)
  }

  async update(
    item: ComponentView,
    values: Partial<ComponentView>,
  ): Promise<ComponentView> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: ComponentView): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<ComponentView> = {},
  ): Promise<ComponentView[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<ComponentView> = {},
  ): Promise<ComponentView> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<ComponentView> = {},
  ): Promise<ComponentView[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
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
    queryOptions: RequestHelper.QueryOptions<ComponentView> = {},
  ): Promise<ComponentView[]> {
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

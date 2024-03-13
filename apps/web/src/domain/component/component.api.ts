import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Component } from './component.model'

export class ComponentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Component>,
  ): Promise<Component[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/components${buildOptions}`)
  }

  static findOne(
    componentId: string,
    queryOptions?: ApiHelper.QueryOptions<Component>,
  ): Promise<Component> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/components/${componentId}${buildOptions}`)
  }

  static createOne(values: Partial<Component>): Promise<Component> {
    return HttpService.api.post(`/v1/components`, values)
  }

  static updateOne(
    componentId: string,
    values: Partial<Component>,
  ): Promise<Component> {
    return HttpService.api.patch(`/v1/components/${componentId}`, values)
  }

  static deleteOne(componentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/components/${componentId}`)
  }
}

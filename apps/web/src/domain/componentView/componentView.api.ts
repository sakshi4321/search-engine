import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ComponentView } from './componentView.model'

export class ComponentViewApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ComponentView>,
  ): Promise<ComponentView[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/componentViews${buildOptions}`)
  }

  static findOne(
    componentViewId: string,
    queryOptions?: ApiHelper.QueryOptions<ComponentView>,
  ): Promise<ComponentView> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/componentViews/${componentViewId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<ComponentView>): Promise<ComponentView> {
    return HttpService.api.post(`/v1/componentViews`, values)
  }

  static updateOne(
    componentViewId: string,
    values: Partial<ComponentView>,
  ): Promise<ComponentView> {
    return HttpService.api.patch(
      `/v1/componentViews/${componentViewId}`,
      values,
    )
  }

  static deleteOne(componentViewId: string): Promise<void> {
    return HttpService.api.delete(`/v1/componentViews/${componentViewId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<ComponentView>,
  ): Promise<ComponentView[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/componentViews${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<ComponentView>,
  ): Promise<ComponentView> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/componentViews`,
      values,
    )
  }

  static findManyByComponentId(
    componentId: string,
    queryOptions?: ApiHelper.QueryOptions<ComponentView>,
  ): Promise<ComponentView[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/components/component/${componentId}/componentViews${buildOptions}`,
    )
  }

  static createOneByComponentId(
    componentId: string,
    values: Partial<ComponentView>,
  ): Promise<ComponentView> {
    return HttpService.api.post(
      `/v1/components/component/${componentId}/componentViews`,
      values,
    )
  }
}

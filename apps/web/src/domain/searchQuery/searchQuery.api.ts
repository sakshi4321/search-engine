import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { SearchQuery } from './searchQuery.model'

export class SearchQueryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<SearchQuery>,
  ): Promise<SearchQuery[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/searchQuerys${buildOptions}`)
  }

  static findOne(
    searchQueryId: string,
    queryOptions?: ApiHelper.QueryOptions<SearchQuery>,
  ): Promise<SearchQuery> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/searchQuerys/${searchQueryId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<SearchQuery>): Promise<SearchQuery> {
    return HttpService.api.post(`/v1/searchQuerys`, values)
  }

  static updateOne(
    searchQueryId: string,
    values: Partial<SearchQuery>,
  ): Promise<SearchQuery> {
    return HttpService.api.patch(`/v1/searchQuerys/${searchQueryId}`, values)
  }

  static deleteOne(searchQueryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/searchQuerys/${searchQueryId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<SearchQuery>,
  ): Promise<SearchQuery[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/searchQuerys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<SearchQuery>,
  ): Promise<SearchQuery> {
    return HttpService.api.post(`/v1/users/user/${userId}/searchQuerys`, values)
  }
}

import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { SearchResult } from './searchResult.model'

export class SearchResultApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<SearchResult>,
  ): Promise<SearchResult[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/searchResults${buildOptions}`)
  }

  static findOne(
    searchResultId: string,
    queryOptions?: ApiHelper.QueryOptions<SearchResult>,
  ): Promise<SearchResult> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/searchResults/${searchResultId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<SearchResult>): Promise<SearchResult> {
    return HttpService.api.post(`/v1/searchResults`, values)
  }

  static updateOne(
    searchResultId: string,
    values: Partial<SearchResult>,
  ): Promise<SearchResult> {
    return HttpService.api.patch(`/v1/searchResults/${searchResultId}`, values)
  }

  static deleteOne(searchResultId: string): Promise<void> {
    return HttpService.api.delete(`/v1/searchResults/${searchResultId}`)
  }

  static findManyBySearchQueryId(
    searchQueryId: string,
    queryOptions?: ApiHelper.QueryOptions<SearchResult>,
  ): Promise<SearchResult[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/searchQuerys/searchQuery/${searchQueryId}/searchResults${buildOptions}`,
    )
  }

  static createOneBySearchQueryId(
    searchQueryId: string,
    values: Partial<SearchResult>,
  ): Promise<SearchResult> {
    return HttpService.api.post(
      `/v1/searchQuerys/searchQuery/${searchQueryId}/searchResults`,
      values,
    )
  }

  static findManyByComponentId(
    componentId: string,
    queryOptions?: ApiHelper.QueryOptions<SearchResult>,
  ): Promise<SearchResult[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/components/component/${componentId}/searchResults${buildOptions}`,
    )
  }

  static createOneByComponentId(
    componentId: string,
    values: Partial<SearchResult>,
  ): Promise<SearchResult> {
    return HttpService.api.post(
      `/v1/components/component/${componentId}/searchResults`,
      values,
    )
  }
}

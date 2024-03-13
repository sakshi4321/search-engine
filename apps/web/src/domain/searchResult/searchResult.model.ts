import { SearchQuery } from '../searchQuery'

import { Component } from '../component'

export class SearchResult {
  id: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  searchQueryId: string

  searchQuery?: SearchQuery

  componentId: string

  component?: Component
}

import { User } from '../user'

import { SearchResult } from '../searchResult'

export class SearchQuery {
  id: string

  queryText?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId: string

  user?: User

  searchResults?: SearchResult[]
}

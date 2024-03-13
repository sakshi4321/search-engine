import { SearchResult } from '../searchResult'

import { ComponentView } from '../componentView'

export class Component {
  id: string

  name?: string

  description?: string

  type?: string

  detailedInfo?: string

  detailedInfoUrl?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  searchResults?: SearchResult[]

  componentViews?: ComponentView[]
}

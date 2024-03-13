import { Notification } from '../notification'

import { SearchQuery } from '../searchQuery'

import { ComponentView } from '../componentView'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  searchQuerys?: SearchQuery[]

  componentViews?: ComponentView[]
}

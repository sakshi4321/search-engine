import { User } from '../user'

import { Component } from '../component'

export class ComponentView {
  id: string

  timestamp?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId: string

  user?: User

  componentId: string

  component?: Component
}

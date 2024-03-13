import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Component as ComponentModel } from './component/component.model'

import { SearchQuery as SearchQueryModel } from './searchQuery/searchQuery.model'

import { SearchResult as SearchResultModel } from './searchResult/searchResult.model'

import { ComponentView as ComponentViewModel } from './componentView/componentView.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Component extends ComponentModel {}

  export class SearchQuery extends SearchQueryModel {}

  export class SearchResult extends SearchResultModel {}

  export class ComponentView extends ComponentViewModel {}
}

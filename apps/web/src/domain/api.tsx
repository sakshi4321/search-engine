import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ComponentApi } from './component/component.api'

import { SearchQueryApi } from './searchQuery/searchQuery.api'

import { SearchResultApi } from './searchResult/searchResult.api'

import { ComponentViewApi } from './componentView/componentView.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Component extends ComponentApi {}

  export class SearchQuery extends SearchQueryApi {}

  export class SearchResult extends SearchResultApi {}

  export class ComponentView extends ComponentViewApi {}
}

import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationComponentSubscriber } from './subscribers/notification.component.subscriber'

import { NotificationSearchQuerySubscriber } from './subscribers/notification.searchQuery.subscriber'

import { NotificationSearchResultSubscriber } from './subscribers/notification.searchResult.subscriber'

import { NotificationComponentViewSubscriber } from './subscribers/notification.componentView.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationComponentSubscriber,

    NotificationSearchQuerySubscriber,

    NotificationSearchResultSubscriber,

    NotificationComponentViewSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}

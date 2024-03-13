import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ComponentApplicationModule } from './component/application'

import { SearchQueryApplicationModule } from './searchQuery/application'

import { SearchResultApplicationModule } from './searchResult/application'

import { ComponentViewApplicationModule } from './componentView/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    ComponentApplicationModule,

    SearchQueryApplicationModule,

    SearchResultApplicationModule,

    ComponentViewApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}

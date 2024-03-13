import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Component } from '../../../modules/component/domain'

@Entity()
export class ComponentView {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  timestamp?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.componentViews)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  componentId: string

  @ManyToOne(() => Component, parent => parent.componentViews)
  @JoinColumn({ name: 'componentId' })
  component?: Component

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

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

import { SearchQuery } from '../../../modules/searchQuery/domain'

import { Component } from '../../../modules/component/domain'

@Entity()
export class SearchResult {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  searchQueryId: string

  @ManyToOne(() => SearchQuery, parent => parent.searchResults)
  @JoinColumn({ name: 'searchQueryId' })
  searchQuery?: SearchQuery

  @Column({})
  componentId: string

  @ManyToOne(() => Component, parent => parent.searchResults)
  @JoinColumn({ name: 'componentId' })
  component?: Component

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

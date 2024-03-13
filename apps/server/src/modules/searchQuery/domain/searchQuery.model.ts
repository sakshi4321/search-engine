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

import { SearchResult } from '../../../modules/searchResult/domain'

@Entity()
export class SearchQuery {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  queryText?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.searchQuerys)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => SearchResult, child => child.searchQuery)
  searchResults?: SearchResult[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

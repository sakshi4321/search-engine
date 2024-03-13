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

import { SearchResult } from '../../../modules/searchResult/domain'

import { ComponentView } from '../../../modules/componentView/domain'

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  type?: string

  @Column({ nullable: true })
  detailedInfo?: string

  @Column({ nullable: true })
  detailedInfoUrl?: string

  @OneToMany(() => SearchResult, child => child.component)
  searchResults?: SearchResult[]

  @OneToMany(() => ComponentView, child => child.component)
  componentViews?: ComponentView[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

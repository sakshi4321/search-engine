import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ComponentViewCreateDto {
  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  componentId?: string
}

export class ComponentViewUpdateDto {
  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  componentId?: string
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CompanySwaggerProperties } from './SwaggerProperties'

export default class CompanyResponseDto {
  @ApiProperty(CompanySwaggerProperties.id)
  id: number
  @ApiProperty(CompanySwaggerProperties.name)
  name: string
  @ApiProperty(CompanySwaggerProperties.fantasyName)
  fantasyName: string
  @ApiProperty(CompanySwaggerProperties.cpfCnpj)
  cpfCnpj: string
  @ApiProperty(CompanySwaggerProperties.type)
  type: string
  @ApiPropertyOptional(CompanySwaggerProperties.phone)
  phone?: string
  @ApiPropertyOptional(CompanySwaggerProperties.email)
  email?: string
  @ApiPropertyOptional(CompanySwaggerProperties.cep)
  cep?: string
  @ApiPropertyOptional(CompanySwaggerProperties.street)
  street?: string
  @ApiPropertyOptional(CompanySwaggerProperties.number)
  number?: string
  @ApiPropertyOptional(CompanySwaggerProperties.complement)
  complement?: string
  @ApiPropertyOptional(CompanySwaggerProperties.city)
  city?: string
  @ApiPropertyOptional(CompanySwaggerProperties.uf)
  uf?: string
  @ApiPropertyOptional(CompanySwaggerProperties.parentCompanyId)
  parentCompanyId?: number
  @ApiPropertyOptional(CompanySwaggerProperties.isActive)
  isActive?: boolean
  @ApiPropertyOptional(CompanySwaggerProperties.createdAt)
  createdAt?: string | Date
  @ApiPropertyOptional(CompanySwaggerProperties.updatedAt)
  updatedAt?: string | Date
}

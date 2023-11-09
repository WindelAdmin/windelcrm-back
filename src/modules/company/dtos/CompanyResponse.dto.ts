import { ApiProperty } from '@nestjs/swagger'
import { CompanySwaggerProperties } from './SwaggerProperties'

export default class CompanyResponseDto {
  @ApiProperty(CompanySwaggerProperties.name)
  name: string
  @ApiProperty(CompanySwaggerProperties.fantasyName)
  fantasyName: string
  @ApiProperty(CompanySwaggerProperties.cpfCnpj)
  cpfCnpj: string
  @ApiProperty(CompanySwaggerProperties.phone)
  phone?: string
  @ApiProperty(CompanySwaggerProperties.email)
  email: string
  @ApiProperty(CompanySwaggerProperties.cep)
  cep: string
  @ApiProperty(CompanySwaggerProperties.street)
  street: string
  @ApiProperty(CompanySwaggerProperties.number)
  number: string
  @ApiProperty(CompanySwaggerProperties.complement)
  complement: string
  @ApiProperty(CompanySwaggerProperties.city)
  city: string
  @ApiProperty(CompanySwaggerProperties.uf)
  uf: string
  @ApiProperty(CompanySwaggerProperties.createdAt)
  createdAt: string
  @ApiProperty(CompanySwaggerProperties.updatedAt)
  updatedAt: string
}

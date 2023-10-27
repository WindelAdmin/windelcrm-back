import { Prisma } from '@prisma/client'

export default class Address implements Prisma.AddressCreateInput {
  cep?: string
  street?: string
  number?: string
  district?: string
  city: string
  uf: string
  isResidential: boolean
  isMain?: boolean
  createAt?: string | Date
  updatedAt?: string | Date
  person: Prisma.PersonCreateNestedOneWithoutAddressInput
}

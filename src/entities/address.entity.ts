import { Prisma } from '@prisma/client';

export default class Address implements Prisma.PersonAddressUncheckedCreateInput {
  id?: number;
  companyId: number;
  cep?: string;
  street?: string;
  number?: string;
  district?: string;
  city: string;
  uf: string;
  isResidential?: boolean;
  isMain?: boolean;
  personId: number;
  createAt?: string | Date;
  updatedAt?: string | Date;

}

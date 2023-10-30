import { Prisma } from '@prisma/client';

export default class Company implements Prisma.CompanyCreateInput {
  name: string;
  fantasyName: string;
  cpfCnpj: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  parentCompany?: Prisma.CompanyCreateNestedOneWithoutChildCompaniesInput;
  childCompanies?: Prisma.CompanyCreateNestedManyWithoutParentCompanyInput;
}
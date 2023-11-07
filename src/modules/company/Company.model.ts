
  import { Prisma } from '@prisma/client';

  export default class CompanyModel implements Prisma.CompanyUncheckedCreateInput {
    id?: number;
    name: string;
    fantasyName: string;
    cpfCnpj: string;
    phone?: string;
    email: string;
    cep: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    uf: string;
    isActive?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    parentCompanyId?: number;
    isReseller?: boolean;
    childCompanies?: Prisma.CompanyUncheckedCreateNestedManyWithoutParentCompanyInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput;
    persons?: Prisma.PersonUncheckedCreateNestedManyWithoutCompanyInput;
    deparments?: Prisma.DepartmentUncheckedCreateNestedManyWithoutCompanyInput;
    roles?: Prisma.RoleUncheckedCreateNestedManyWithoutCompanyInput;
    userPermissions?: Prisma.UserPermissionUncheckedCreateNestedManyWithoutCompanyInput;
    personAddress?: Prisma.PersonAddressUncheckedCreateNestedManyWithoutCompanyInput;
    employee?: Prisma.EmployeeUncheckedCreateNestedManyWithoutCompanyInput;
    workSchedule?: Prisma.WorkScheduleUncheckedCreateNestedManyWithoutCompanyInput;
    audit?: Prisma.AuditUncheckedCreateNestedManyWithoutCompanyInput;
    
}

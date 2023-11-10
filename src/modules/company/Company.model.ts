
  
  export default class CompanyModel {
    id?: number;
    name: string;
    fantasyName: string;
    cpfCnpj: string;
    phone: string;
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
    type: string;
}

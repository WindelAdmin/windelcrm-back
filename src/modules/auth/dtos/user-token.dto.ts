
export interface UserTokenDto {
  token: string,
  userData: {
    id: number,
    name: string,
    email: string
  },
  companyData: {
    id: number,
    name: string,
    cnpj: string
  }
}

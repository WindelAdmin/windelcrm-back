import CompanyRepository from '@src/modules/core/company/Company.repository'
import CompanyFindAllService from '@src/modules/core/company/use-cases/CompanyFindAll.usecase'

const companiesListMock = [
  {
    id: 1,
    name: 'Company Name',
    cpfCnpj: '12345678901',
    email: 'test@email.com',
    phone: '1234567890',
    cep: '123131',
    city: 'Dom poedro',
    fantasyName: 'aaaa',
    number: '102',
    street: 'aaaa',
    type: 'M',
    isActive: true,
    uf: 'RS',
    parentCompanyId: undefined,
    complement: 'aaa',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Company Name 2',
    cpfCnpj: '12345678902',
    email: 'test2@email.com',
    phone: '1234567891',
    cep: '1231312',
    city: 'Dom Pedro',
    fantasyName: 'aaaa',
    number: '102',
    street: 'aaaa',
    type: 'M',
    isActive: true,
    uf: 'RS',
    parentCompanyId: undefined,
    complement: 'aaa',
    createdAt: new Date(),
    updatedAt: undefined
  }
]

jest.mock('@src/modules/core/company/Company.repository')

describe('CompanyFindAllService', () => {
  let companyFindAllService: CompanyFindAllService
  let companyRepository: CompanyRepository

  beforeEach(() => {
    companyRepository = new CompanyRepository()
    companyFindAllService = new CompanyFindAllService(companyRepository)
  })

  describe('execute', () => {
    test('should return company list response', async () => {
      jest.spyOn(companyRepository, 'findAll').mockResolvedValue(companiesListMock)
      const result = await companyFindAllService.execute()
      expect(result).toEqual(
        companiesListMock.map((company) => {
          return {
            ...company,
            createdAt: company.createdAt.toISOString(),
            updatedAt: company.updatedAt?.toISOString()
          }
        })
      )
    })
  })
})

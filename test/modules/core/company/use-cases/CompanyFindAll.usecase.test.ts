import CompanyRepository from '@src/modules/core/company/Company.repository'
import CompanyFindAllService from '@src/modules/core/company/use-cases/CompanyFindAll.usecase'

describe('CompanyFindAllService', () => {
  let companyFindAllService: CompanyFindAllService
  let companyRepository: CompanyRepository

  beforeEach(() => {
    companyRepository = new CompanyRepository()
    companyFindAllService = new CompanyFindAllService(companyRepository)
  })

  describe('execute', () => {
    test('should return company list response', async () => {
      const data = [
        {
          id: 1,
          name: 'Company Namee',
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
          updatedAt: undefined
        }
      ]

      jest.spyOn(companyRepository, 'findAll').mockResolvedValue(data)

      const result = await companyFindAllService.execute()

      expect(result).toEqual(
        data.map((d) => {
          return {
            ...d,
            createdAt: expect.any(String),
            updatedAt: d.updatedAt ? expect.any(String) : undefined
          }
        })
      )
    })
  })
})

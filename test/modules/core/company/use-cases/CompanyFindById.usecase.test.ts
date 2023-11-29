import CompanyRepository from '@src/modules/core/company/Company.repository'
import CompanyFindByIdService from '@src/modules/core/company/use-cases/CompanyFindById.usecase'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'

const mockCompanyId = 1
const companyMock = {
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
}

jest.mock('@src/modules/core/company/Company.repository')

describe('CompanyFindByIdService', () => {
  let companyFindByIdService: CompanyFindByIdService
  let companyRepository: CompanyRepository

  beforeEach(() => {
    companyRepository = new CompanyRepository()
    companyFindByIdService = new CompanyFindByIdService(companyRepository)
  })

  describe('execute', () => {
    test('should return company response', async () => {
      jest.spyOn(companyRepository, 'findById').mockResolvedValue(companyMock)
      const result = await companyFindByIdService.execute(mockCompanyId)
      expect(result).toEqual(companyMock)
    })

    test('should return company response with updateAt undefined', async () => {
      let dataResponse = { ...companyMock, updatedAt: undefined }
      jest.spyOn(companyRepository, 'findById').mockResolvedValue(dataResponse)
      const result = await companyFindByIdService.execute(mockCompanyId)
      expect(result).toEqual(dataResponse)
    })

    test('should throw HttpNotFoundException if company is not found', async () => {
      jest.spyOn(companyRepository, 'findById').mockResolvedValue(null)
      await expect(companyFindByIdService.execute(mockCompanyId)).rejects.toThrowError(new HttpNotFoundException(HttpCompanyMessages.ID_NOT_EXIST))
    })
  })
})

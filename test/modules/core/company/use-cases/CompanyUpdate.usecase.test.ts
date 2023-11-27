import CompanyRepository from '@src/modules/core/company/Company.repository'
import CompanyUpdateDto from '@src/modules/core/company/dtos/CompanyUpdate.dto'
import CompanyUpdateService from '@src/modules/core/company/use-cases/CompanyUpdate.usecase'
import { HttpConflictException } from '@src/shared/exceptions/HttpConflict.exception'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'

const id = 1
const data = {
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
  uf: 'RS'
} as CompanyUpdateDto

describe('CompanyUpdateService', () => {
  let companyUpdateService: CompanyUpdateService
  let companyRepository: CompanyRepository

  beforeEach(() => {
    companyRepository = new CompanyRepository()
    companyUpdateService = new CompanyUpdateService(companyRepository)
  })

  it('should update company', async () => {
    jest.spyOn(companyRepository, 'validateExistId').mockResolvedValue(true)
    jest.spyOn(companyRepository, 'validateExistEmail').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistPhone').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'update').mockResolvedValue()

    await companyUpdateService.execute(id, data)

    expect(companyRepository.validateExistId).toHaveBeenCalledWith(id)
    expect(companyRepository.validateExistEmail).toHaveBeenCalledWith(data.email)
    expect(companyRepository.validateExistPhone).toHaveBeenCalledWith(data.phone)
    expect(companyRepository.update).toHaveBeenCalledWith(id, data)
  })

  it('should throw HttpExceptionNotFound on update company', async () => {
    jest.spyOn(companyRepository, 'validateExistId').mockResolvedValue(false)

    await companyUpdateService.execute(id, data).catch((error) => {
      expect(error).toBeInstanceOf(HttpNotFoundException)
      expect(error.message).toEqual(HttpCompanyMessages.ID_NOT_EXIST)
    })

    expect(companyRepository.validateExistId).toHaveBeenCalledWith(id)
  })

  it('should throw HttpConflictException on update email company', async () => {
    jest.spyOn(companyRepository, 'validateExistId').mockResolvedValue(true)
    jest.spyOn(companyRepository, 'validateExistEmail').mockResolvedValue(true)

    await companyUpdateService.execute(id, data).catch((error) => {
      expect(error).toBeInstanceOf(HttpConflictException)
      expect(error.message).toEqual(HttpCompanyMessages.EMAIL_DUPLICATED)
    })

    expect(companyRepository.validateExistId).toHaveBeenCalledWith(id)
    expect(companyRepository.validateExistEmail).toHaveBeenCalledWith(data.email)
  })

  it('should throw HttpConflictException on update phone company', async () => {
    jest.spyOn(companyRepository, 'validateExistId').mockResolvedValue(true)
    jest.spyOn(companyRepository, 'validateExistEmail').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistPhone').mockResolvedValue(true)

    await companyUpdateService.execute(id, data).catch((error) => {
      expect(error).toBeInstanceOf(HttpConflictException)
      expect(error.message).toEqual(HttpCompanyMessages.PHONE_DUPLICATED)
    })

    expect(companyRepository.validateExistId).toHaveBeenCalledWith(id)
    expect(companyRepository.validateExistEmail).toHaveBeenCalledWith(data.email)
    expect(companyRepository.validateExistPhone).toHaveBeenCalledWith(data.phone)
  })
})

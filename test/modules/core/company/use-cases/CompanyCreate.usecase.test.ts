import CompanyRepository from '@src/modules/core/company/Company.repository'
import CompanyCreateDto from '@src/modules/core/company/dtos/CompanyCreate.dto'
import CompanyCreateService from '@src/modules/core/company/use-cases/CompanyCreate.usecase'
import { HttpConflictException } from '@src/shared/exceptions/HttpConflict.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'

const input: CompanyCreateDto = {
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
}

describe('CompanyCreateService', () => {
  let companyCreateService: CompanyCreateService
  let companyRepository: CompanyRepository

  beforeEach(() => {
    companyRepository = new CompanyRepository()
    companyCreateService = new CompanyCreateService(companyRepository)
  })

  test('should create Company', async () => {
    jest.spyOn(companyRepository, 'validateExistName').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistCfpCnpj').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistEmail').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistPhone').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'create').mockResolvedValue()

    await companyCreateService.execute(input)
    expect(companyRepository.create).toHaveBeenCalledWith(input)
  })

  test('should throw a HttpConflictException if company name already exists', async () => {
    jest.spyOn(companyRepository, 'validateExistName').mockResolvedValue(true)

    try {
      await companyCreateService.execute(input)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpConflictException)
      expect(error.message).toEqual(HttpCompanyMessages.NAME_ALREADY_EXISTS)
    }

    expect(companyRepository.validateExistName).toHaveBeenCalledWith(input.name)
  })

  test('should throw a HttpConflictException if company CPF/CNPJ already exists', async () => {
    jest.spyOn(companyRepository, 'validateExistName').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistCfpCnpj').mockResolvedValue(true)

    try {
      await companyCreateService.execute(input)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpConflictException)
      expect(error.message).toEqual(HttpCompanyMessages.CPF_CNPJ_ALREADY_EXISTS)
    }

    expect(companyRepository.validateExistName).toHaveBeenCalledWith(input.name)
    expect(companyRepository.validateExistCfpCnpj).toHaveBeenCalledWith(input.cpfCnpj)
  })

  test('should throw a HttpConflictException if company Email already exists', async () => {
    jest.spyOn(companyRepository, 'validateExistName').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistCfpCnpj').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistEmail').mockResolvedValue(true)

    try {
      await companyCreateService.execute(input)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpConflictException)
      expect(error.message).toEqual(HttpCompanyMessages.EMAIL_ALREADY_EXISTS)
    }

    expect(companyRepository.validateExistName).toHaveBeenCalledWith(input.name)
    expect(companyRepository.validateExistCfpCnpj).toHaveBeenCalledWith(input.cpfCnpj)
    expect(companyRepository.validateExistEmail).toHaveBeenCalledWith(input.email)
  })

  test('should throw a HttpConflictException if company Phone already exists', async () => {
    jest.spyOn(companyRepository, 'validateExistName').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistCfpCnpj').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistEmail').mockResolvedValue(false)
    jest.spyOn(companyRepository, 'validateExistPhone').mockResolvedValue(true)

    try {
      await companyCreateService.execute(input)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpConflictException)
      expect(error.message).toEqual(HttpCompanyMessages.PHONE_ALREADY_EXISTS)
    }

    expect(companyRepository.validateExistName).toHaveBeenCalledWith(input.name)
    expect(companyRepository.validateExistCfpCnpj).toHaveBeenCalledWith(input.cpfCnpj)
    expect(companyRepository.validateExistEmail).toHaveBeenCalledWith(input.email)
    expect(companyRepository.validateExistPhone).toHaveBeenCalledWith(input.phone)
  })
})

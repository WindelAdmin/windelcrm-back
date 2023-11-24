import CompanyRepository from '@src/modules/core/company/Company.repository'
import CompanyDeleteService from '@src/modules/core/company/use-cases/CompanyDelete.service'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'

const id = 1

describe('CompanyDeleteService', () => {
  let companyRepository: CompanyRepository
  let companyDeleteService: CompanyDeleteService

  beforeEach(() => {
    companyRepository = new CompanyRepository()
    companyDeleteService = new CompanyDeleteService(companyRepository)
  })

  it('should delete company', async () => {
    jest.spyOn(companyRepository, 'validateExistId').mockResolvedValueOnce(true)
    jest.spyOn(companyRepository, 'delete').mockResolvedValueOnce()

    await companyDeleteService.execute(id)

    expect(companyRepository.validateExistId).toHaveBeenCalledWith(id)
    expect(companyRepository.delete).toHaveBeenCalledWith(id)
  })

  it('should throw HttpNotFoundException on delete company', async () => {
    jest.spyOn(companyRepository, 'validateExistId').mockResolvedValueOnce(false)

    try {
      await companyDeleteService.execute(id)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpNotFoundException)
      expect(error.message).toEqual(HttpCompanyMessages.ID_NOT_EXIST)
    }

    expect(companyRepository.validateExistId).toHaveBeenCalledWith(id)
  })
})

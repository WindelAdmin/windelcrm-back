import UserRepository from '@src/modules/core/user/User.repository'
import { UserUpdateDto } from '@src/modules/core/user/dtos/UserUpdate.dto'
import UserUpdateService from '@src/modules/core/user/use-cases/UserUpdate.usecase'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'

jest.mock('@src/modules/core/user/User.repository')

describe('UserUpdateService', () => {
  let userUpdateService: UserUpdateService
  let userRepository: UserRepository

  beforeEach(async () => {
    userRepository = new UserRepository()
    userUpdateService = new UserUpdateService(userRepository)
  })

  it('Should update user when valid id is provided', async () => {
    const input = { id: 1, data: { name: 'Wesley Sousa' } as UserUpdateDto }

    jest.spyOn(userRepository, 'validateExistId').mockResolvedValue(true)

    await expect(userUpdateService.execute(input)).resolves.not.toThrow()
  })

  it('Should throw HttpNotFoundException when invalid id is provided', async () => {
    const input = { id: 1, data: { name: 'Sousa' } as UserUpdateDto }

    jest.spyOn(userRepository, 'validateExistId').mockResolvedValue(false)

    await expect(userUpdateService.execute(input)).rejects.toThrow(new HttpNotFoundException(HttpMessages.ID_NOT_EXIST))
  })
})

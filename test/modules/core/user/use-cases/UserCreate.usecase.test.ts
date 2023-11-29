import UserRepository from '@modules/core/user/User.repository'
import UserCreateDto from '@modules/core/user/dtos/UserCreate.dto'
import UserCreateService from '@modules/core/user/use-cases/UserCreate.usecase'
import { CryptoService } from '@modules/generic/crypto/Crypto.service'
import { HttpConflictException } from '@src/shared/exceptions/HttpConflict.exception'

const userDataMock = {
  email: 'jhon@example.com',
  password: '$hyattt@!',
  name: 'Empresa Exemplo',
  permissions: [4, 7]
} as UserCreateDto

jest.mock('@src/modules/core/user/User.repository')

describe('UserCreateService', () => {
  let userCreateService: UserCreateService
  let userRepositoryMock: UserRepository

  beforeEach(() => {
    const cryptoService = new CryptoService()
    userRepositoryMock = new UserRepository()
    userCreateService = new UserCreateService(userRepositoryMock, cryptoService)
  })

  test('Should create a user', async () => {
    jest.spyOn(userRepositoryMock, 'validateExistEmail').mockResolvedValue(false)
    jest.spyOn(userRepositoryMock, 'create').mockResolvedValue()

    await userCreateService.execute(userDataMock)

    expect(userRepositoryMock.validateExistEmail).toHaveBeenCalledWith(userDataMock.email)
    expect(userRepositoryMock.create).toHaveBeenCalledWith(userDataMock)
  })

  test('Should throw HttpConflictException', async () => {
    jest.spyOn(userRepositoryMock, 'validateExistEmail').mockResolvedValue(true)

    await expect(userCreateService.execute(userDataMock)).rejects.toThrowError(HttpConflictException)
    expect(userRepositoryMock.validateExistEmail).toHaveBeenCalledWith(userDataMock.email)
  })
})

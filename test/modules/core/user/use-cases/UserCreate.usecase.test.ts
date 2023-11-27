import { CryptoService } from '@src/modules/generic/crypto/Crypto.service'
import { HttpConflictException } from '@src/shared/exceptions/HttpConflict.exception'
import UserRepository from '../../../../../src/modules/core/user/User.repository'
import UserCreateDto from '../../../../../src/modules/core/user/dtos/UserCreate.dto'
import UserCreateService from '../../../../../src/modules/core/user/use-cases/UserCreate.usecase'

const userDataMock = {
  email: 'jhon@example.com',
  password: '$hyattt@!',
  name: 'Empresa Exemplo',
  permissions: [4, 7]
} as UserCreateDto

describe('UserCreateService', () => {
  let userCreateService: UserCreateService
  let userRepositoryMock: jest.Mocked<UserRepository>

  beforeEach(() => {
    const cryptoService = new CryptoService() as jest.Mocked<CryptoService>
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>
    userCreateService = new UserCreateService(userRepositoryMock, cryptoService)
  })

  it('Should create a user', async () => {
    jest.spyOn(userRepositoryMock, 'validateExistEmail').mockResolvedValue(false)
    jest.spyOn(userRepositoryMock, 'create').mockResolvedValue()

    await userCreateService.execute(userDataMock)

    expect(userRepositoryMock.validateExistEmail).toHaveBeenCalledWith(userDataMock.email)
    expect(userRepositoryMock.create).toHaveBeenCalledWith(userDataMock)
  })

  it('Should throw HttpConflictException', async () => {
    jest.spyOn(userRepositoryMock, 'validateExistEmail').mockResolvedValue(true)

    await expect(userCreateService.execute(userDataMock)).rejects.toThrowError(HttpConflictException)
    expect(userRepositoryMock.validateExistEmail).toHaveBeenCalledWith(userDataMock.email)
  })
})

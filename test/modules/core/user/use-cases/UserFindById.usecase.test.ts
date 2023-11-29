import UserRepository from '@src/modules/core/user/User.repository'
import { UserResponseDto } from '@src/modules/core/user/dtos/UserResponse.dto'
import UserFindByIdService from '@src/modules/core/user/use-cases/UserFindById.usecase'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'

const mockCompanyId = 1
const userResponseDtoMock = {
  id: 1,
  name: 'Company Name',
  email: 'wesleytuck@outlook.com',
  companyId: 1,
  profilePhoto: undefined,
  isLogged: true,
  lastAccess: new Date(),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  permissions: [
    {
      id: 1,
      description: 'Permission 01',
      type: 'Route',
      isActive: true
    }
  ]
} as UserResponseDto

const userPrismaResultMock = {
  id: 1,
  name: 'Company Name',
  email: 'wesleytuck@outlook.com',
  companyId: 1,
  password: 'bga523$75jhdy!',
  profilePhoto: undefined,
  isLogged: true,
  lastAccess: new Date(),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  userPermissions: [
    {
      id: 1,
      companyId: 1,
      userId: 1,
      permissionId: 1,
      createdAt: new Date(),
      permission: {
        id: 1,
        description: 'Permission 01',
        type: 'Route',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  ]
}

jest.mock('@src/modules/core/user/User.repository')

describe('UserFindByIdService', () => {
  let userFindByIdService: UserFindByIdService
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UserRepository()
    userFindByIdService = new UserFindByIdService(userRepository)
  })

  describe('execute', () => {
    test('should return user response', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(userPrismaResultMock)

      const result = await userFindByIdService.execute(mockCompanyId)

      expect(result).toEqual(userResponseDtoMock)
    })

    test('should return user response with updateAt undefined', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue({
        ...userPrismaResultMock,
        updatedAt: undefined
      })

      const result = await userFindByIdService.execute(mockCompanyId)

      expect(result.updatedAt).toBeUndefined()
      expect(result.permissions).toEqual(userResponseDtoMock.permissions)
    })

    test('should throw HttpNotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null)

      await expect(userFindByIdService.execute(mockCompanyId)).rejects.toThrow(new HttpNotFoundException(HttpCompanyMessages.ID_NOT_EXIST))
    })
  })
})

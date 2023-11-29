import UserRepository from '@src/modules/core/user/User.repository'
import { UserResponseDto } from '@src/modules/core/user/dtos/UserResponse.dto'
import UserFindAllService from '@src/modules/core/user/use-cases/UserFindAll.usecase'

const userResponseDtoMock = [{
  id: 1,
  name: 'Company Namee',
  email: 'Wesleytuck@outlook.com',
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
      description: 'Desteaa',
      type: 'Route',
      isActive: true
    }
  ]
}] as UserResponseDto[]

const userPrismaResultMock = [{
  id: 1,
  name: 'Company Namee',
  email: 'Wesleytuck@outlook.com',
  companyId: 1,
  password: 'adadad',
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
        description: 'Desteaa',
        type: 'Route',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  ]
}]

describe('UserFindAllService', () => {
  let userFindAllService: UserFindAllService
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UserRepository()
    userFindAllService = new UserFindAllService(userRepository)
  })

  describe('execute', () => {
    test('should return user list response', async () => {
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(userPrismaResultMock)

      const result = await userFindAllService.execute()

      expect(result).toEqual(
        userResponseDtoMock.map((userMock) => {
          return {
            ...userMock,
            permissions: userMock.permissions
          }
        })
      )
    })
  })
})

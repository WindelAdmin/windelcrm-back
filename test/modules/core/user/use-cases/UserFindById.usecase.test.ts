import UserRepository from '@src/modules/core/user/User.repository'
import { UserResponseDto } from '@src/modules/core/user/dtos/UserResponse.dto'
import UserFindByIdService from '@src/modules/core/user/use-cases/UserFindById.usecase'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpCompanyMessages } from '@src/shared/http-messages/HttpCompanyMessages'

const mockCompanyId = 1
const userResponseDtoMock = {
  id: 1,
  name: 'Company Namee',
  email: "Wesleytuck@outlook.com",
  companyId: 1,
} as UserResponseDto

 const userPrismaResultMock = {
        id: 1,
        name: 'Company Namee',
        email: "Wesleytuck@outlook.com",
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
      }

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

      expect(result).toEqual({
        ...userPrismaResultMock,
        permissions: expect.any(Array)
      })
    })

    test('should return company response with updateAt undefined', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(expect.any({
        createdAt: new Date(),
        updateAt: undefined
      } as Object))

      const result = await userFindByIdService.execute(mockCompanyId)

      expect(result).toEqual({
        ...UserResponseDto,
        createdAt: expect.any(String),
        updatedAt: undefined
      })
    })

    test('should throw HttpNotFoundException if company is not found', async () => {
      const mockCompanyId = 1
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null)

      await expect(userFindByIdService.execute(mockCompanyId)).rejects.toThrowError(new HttpNotFoundException(HttpCompanyMessages.ID_NOT_EXIST))
    })
  })
})

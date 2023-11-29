import PermissionRepository from '@src/modules/core/user/permission/Permission.repository'
import PermissionFindById from '@src/modules/core/user/permission/use-cases/PermissionFindById.usecase'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'

jest.mock('@src/modules/core/user/permission/Permission.repository')

describe('PermissionFindById', () => {
  let permissionFindById: PermissionFindById
  let permissionRepository: PermissionRepository
  beforeEach(() => {
    permissionRepository = new PermissionRepository()
    permissionFindById = new PermissionFindById(permissionRepository)
  })

  test('should find permission by id', async () => {
    let dataMock = { id: 1, description: 'Tela de Clientes', type: 'R', isActive: true, createdAt: new Date(), updatedAt: new Date() }
    jest.spyOn(permissionRepository, 'findById').mockResolvedValue(dataMock)
    const result = await permissionFindById.execute(1)
    expect(permissionRepository.findById).toHaveBeenCalledWith(1)
    expect(result).toBe(dataMock)
  })

  test('should throw HttpNotFoundException if permission is not found', async () => {
    jest.spyOn(permissionRepository, 'findById').mockResolvedValue(null)
    await expect(permissionFindById.execute(1)).rejects.toThrow(new HttpNotFoundException(HttpMessages.ID_NOT_EXIST))
  })
})

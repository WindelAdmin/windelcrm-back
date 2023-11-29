import PermissionRepository from '@src/modules/core/user/permission/Permission.repository'
import PermissionUpdate from '@src/modules/core/user/permission/use-cases/PermissionUpdate.usecase'
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
import { HttpMessages } from '@src/shared/http-messages/HttpMessages'

describe('PermissionUpdate', () => {
  let permissionUpdated: PermissionUpdate
  let permissionRepository: PermissionRepository
  beforeEach(() => {
    permissionRepository = new PermissionRepository()
    permissionUpdated = new PermissionUpdate(permissionRepository)
  })

  test('should update permission', async () => {
    let dataMock = { description: 'Tela de Clientes', type: 'R', isActive: true }
    jest.spyOn(permissionRepository, 'validateExistId').mockResolvedValue(true)
    jest.spyOn(permissionRepository, 'update').mockResolvedValue()
    await permissionUpdated.execute(1, dataMock)
    expect(permissionRepository.update).toHaveBeenCalledWith(1, dataMock)
  })

  test('should throw HttpConflictException on update if id is not found', async () => {
    jest.spyOn(permissionRepository, 'validateExistId').mockResolvedValue(false)
    await expect(permissionUpdated.execute(1, expect.any(Object))).rejects.toThrow(new HttpNotFoundException(HttpMessages.ID_NOT_EXIST))
  })
})

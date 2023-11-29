import PermissionRepository from '@src/modules/core/user/permission/Permission.repository'
import PermissionCreate from '@src/modules/core/user/permission/use-cases/PermissionCreate.usecase'

describe('PermissionCreate', () => {
  let permissionCreate: PermissionCreate
  let permissionRepository: PermissionRepository
  beforeEach(() => {
    permissionRepository = new PermissionRepository()
    permissionCreate = new PermissionCreate(permissionRepository)
  })

  test('should create permission', async () => {
    let dataMock = { description: 'Tela de Clientes', type: 'R' }
    jest.spyOn(permissionRepository, 'create').mockResolvedValue()
    await permissionCreate.execute(dataMock)
    expect(permissionRepository.create).toHaveBeenCalledWith(dataMock)
  })
})

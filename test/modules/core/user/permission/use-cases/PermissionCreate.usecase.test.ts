import PermissionRepository from '@src/modules/core/user/permission/Permission.repository'
import PermissionCreateDto from '@src/modules/core/user/permission/dtos/PermissionCreate.dto'
import PermissionCreate from '@src/modules/core/user/permission/use-cases/PermissionCreate.usecase'

jest.mock('@src/modules/core/user/permission/Permission.repository')

describe('PermissionCreate', () => {
  let permissionCreate: PermissionCreate
  let permissionRepository: PermissionRepository
  beforeEach(() => {
    permissionRepository = new PermissionRepository()
    permissionCreate = new PermissionCreate(permissionRepository)
  })

  test('should create permission', async () => {
    let dataMock = { description: 'Tela de Clientes', type: 'R', name: 'page.home' } as PermissionCreateDto

    jest.spyOn(permissionRepository, 'create').mockResolvedValue()

    await permissionCreate.execute(dataMock)
    
    expect(permissionRepository.create).toHaveBeenCalledWith(dataMock)
  })
})

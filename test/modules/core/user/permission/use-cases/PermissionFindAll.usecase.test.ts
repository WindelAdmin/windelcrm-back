import PermissionRepository from '@src/modules/core/user/permission/Permission.repository'
import PermissionFindAll from '@src/modules/core/user/permission/use-cases/PermissionFindAll.usecase'

jest.mock('@src/modules/core/user/permission/Permission.repository')

describe('PermissionFindById', () => {
  let permissionFindAll: PermissionFindAll
  let permissionRepository: PermissionRepository
  beforeEach(() => {
    permissionRepository = new PermissionRepository()
    permissionFindAll = new PermissionFindAll(permissionRepository)
  })

  test('should find permission by id', async () => {
    let dataMock = [{ id: 1, description: 'Tela de Clientes', type: 'R', isActive: true, createdAt: new Date(), updatedAt: new Date() }]
    jest.spyOn(permissionRepository, 'findAll').mockResolvedValue(dataMock)
    const result = await permissionFindAll.execute()
    expect(permissionRepository.findAll).toHaveBeenCalled()
    expect(result).toEqual(dataMock)
  })
})

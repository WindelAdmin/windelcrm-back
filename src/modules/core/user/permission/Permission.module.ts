
  import { Module } from '@nestjs/common';
import PrismaModule from '@src/infra/persistence/Prisma.module';
import { UserContext } from '@src/modules/aux/contexts/User.context';
import PermissionController from './Permission.controller';
import PermissionRepository from './Permission.repository';
import PermissionCreate from './use-cases/PermissionCreate.usecase';
import PermissionDelete from './use-cases/PermissionDelete.usecase';
import PermissionFindAll from './use-cases/PermissionFindAll.usecase';
import PermissionFindById from './use-cases/PermissionFindById.usecase';
import PermissionUpdate from './use-cases/PermissionUpdate.usecase';

  @Module({
    imports: [PrismaModule],
    controllers: [PermissionController],
    providers: [
      PermissionCreate, 
      PermissionUpdate, 
      PermissionDelete, 
      PermissionFindById, 
      PermissionFindAll,
      PermissionRepository,
      UserContext
    ],
  })
  export default class PermissionModule {}
  
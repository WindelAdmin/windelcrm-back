
  import { Injectable } from '@nestjs/common';
import { HttpMessages } from '@shared/http-messages/HttpMessages';
import IUseCase from '@shared/interfaces/UseCase.interface';
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception';
import PermissionRepository from '../Permission.repository';
import PermissionUpdateDto from '../dtos/PermissionUpdate.dto';

  @Injectable()
  export default class PermissionUpdate implements IUseCase {
    constructor(private readonly permissionRepository: PermissionRepository){}

    async execute(id: number, data: PermissionUpdateDto): Promise<void> {
      if (!(await this.permissionRepository.validateExistId(id))) {
      throw new HttpNotFoundException(HttpMessages.ID_NOT_EXIST)
    }

       await this.permissionRepository.update(id, data)
    }
  }
  
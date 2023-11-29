
  import { Injectable } from '@nestjs/common';
import { HttpMessages } from '@shared/http-messages/HttpMessages';
import IUseCase from '@shared/interfaces/UseCase.interface';
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception';
import PermissionRepository from '../Permission.repository';

  @Injectable()
  export default class PermissionDelete implements IUseCase {

    constructor(private readonly permissionRepository: PermissionRepository){}

    async execute(id: number): Promise<void> {
       if (!(await this.permissionRepository.validateExistId(id))) {
          throw new HttpNotFoundException(HttpMessages.RECORD_NOT_FOUND)
        }

      await this.permissionRepository.delete(id)
    }
  }
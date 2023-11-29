
  import { Injectable } from '@nestjs/common';
import { HttpMessages } from '@shared/http-messages/HttpMessages';
import IUseCase from '@shared/interfaces/UseCase.interface';
import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception';
import PermissionRepository from '../Permission.repository';
import PermissionResponseDto from '../dtos/PermissionResponse.dto';

  @Injectable()
  export default class PermissionFindById implements IUseCase {
    constructor(private readonly permissionRepository: PermissionRepository){}

    async execute(id: number): Promise<PermissionResponseDto> {
      const permission = await this.permissionRepository.findById(id)
      if(!permission) throw new HttpNotFoundException(HttpMessages.ID_NOT_EXIST)
      return permission
    }
  }
  
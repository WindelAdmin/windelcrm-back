
import { Injectable } from '@nestjs/common';
import IUseCase from '@shared/interfaces/UseCase.interface';
import PermissionRepository from '../Permission.repository';
import PermissionResponseDto from '../dtos/PermissionResponse.dto';

  @Injectable()
  export default class PermissionFindAll implements IUseCase {
    constructor(private readonly permissionRepository: PermissionRepository){}

    async execute(): Promise<PermissionResponseDto[]> {
        return await this.permissionRepository.findAll()
    }
  }
  
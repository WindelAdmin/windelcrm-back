
  import { Injectable } from '@nestjs/common';
import IUseCase from '@shared/interfaces/UseCase.interface';
import PermissionRepository from '../Permission.repository';
import PermissionCreateDto from '../dtos/PermissionCreate.dto';

  @Injectable()
  export default class PermissionCreate implements IUseCase {

    constructor(private readonly permissionRepository: PermissionRepository){}

    async execute(input: PermissionCreateDto): Promise<void> {
      await this.permissionRepository.create(input)
    }
  }
  
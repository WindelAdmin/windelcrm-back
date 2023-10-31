import { Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import AbstractController from '@src/interfaces/AbstractController'
import UserRepository from '@src/modules/person/user/User.repository'
import HttpResponseDto from '@src/shared/dtos/HttpResponseDto'
import { HttpUserMessages } from '@src/shared/http-messages/HttpUserMesssages'
import { Response } from 'express'
import UserService from './User.service'
import { UserCreateDto } from './dtos/UserCreate.dto'
import UserCreateService from './use-cases/UserCreate'

@ApiTags('user')
@Controller()
export class UserController extends AbstractController<UserService, UserRepository> {

  constructor(private readonly userCreateService: UserCreateService, userService: UserService) {
    super(userService, 'Usuário')
  }

  @Post()
  override async create(data: UserCreateDto, @Res() res: Response): Promise<void> {
      await this.userCreateService.execute(data)
      res.status(HttpStatus.CREATED).json(
        new HttpResponseDto(HttpUserMessages.CREATED_SUCCESS)
      )
  }
}

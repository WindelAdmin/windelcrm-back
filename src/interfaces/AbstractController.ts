import { Body, Delete, Get, Injectable, Param, Patch, Post, Query } from '@nestjs/common'
import CurrentUserContext from '@src/modules/person/user/dtos/current-user.dto'
import { CurrentUser } from '@src/shared/decorators/current-user.decorator'
import { IsPublic } from '@src/shared/decorators/is-public.decorator'
import AbstractRepository from './AbstractRepository'
import AbstractService from './AbstractService'

@Injectable()
export default abstract class AbstractController<
  Service extends AbstractService<Repository>,
  Repository extends AbstractRepository
> {
  constructor(private readonly service: Service) {}

  @Post()
  @IsPublic()
  async create(@CurrentUser() currentUser: CurrentUserContext, @Body() data: any): Promise<void> {
    return this.service.create({
      data: data,
      companyId: currentUser.companyId
    })
  }

  @Patch()
  async update(@CurrentUser() currentUser: CurrentUserContext, @Body() data: any): Promise<void> {
    return this.service.update(currentUser.companyId, data, currentUser)
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(+id)
  }

  @Get('/findOneByField')
  async findOneByField(
    @CurrentUser() currentUser: CurrentUserContext,
    @Query('field') field: string,
    @Query('value') value: string,
    @Query('ignoreFields') ignoreFields: string[]
  ): Promise<any> {
    return this.service.findOneByField(field, value, currentUser.companyId, ignoreFields)
  }

  @Get('/findManyByField')
  async findManyByField(
    @CurrentUser() currentUser: CurrentUserContext,
    @Query('field') field: string,
    @Query('value') value: string,
    @Query('ignoreFields') ignoreFields: string[]
  ): Promise<any[]> {
    return this.service.findManyByField(field, value, currentUser.companyId, ignoreFields)
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<any> {
    return this.service.findById(+id)
  }

  @Get()
  async findAll(@CurrentUser() currentUser: CurrentUserContext): Promise<any[]> {
    return this.service.findAll(currentUser.companyId)
  }
}

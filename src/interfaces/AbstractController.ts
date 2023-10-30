import { Body, Delete, Get, Injectable, Param, Patch, Post, Query } from '@nestjs/common';
import { User } from '@src/modules/person/user/user.entity';
import { CurrentUser } from '@src/shared/decorators/current-user.decorator';
import AbstractRepository from './AbstractRepository';
import AbstractService from './AbstractService';

@Injectable()
export default abstract class AbstractController<Service extends AbstractService<Repository>, Repository extends AbstractRepository, > {

  constructor(private readonly service: Service){}

  @Post()
  async create(@Body() data: any): Promise<void> {
    return this.service.create(data);
  }

  @Patch()
  async update(@CurrentUser() currentUser: User, @Query('id') id: number,@Body() data: any): Promise<void> {
    return this.service.update(+id, currentUser.companyId, data);
  }

  @Delete(':id')
   async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(+id)
  }

  @Get('/findOneByField')
  async findOneByField(@CurrentUser() currentUser: User, @Query('field') field: string, @Query('value') value: string, @Query('ignoreFields') ignoreFields: string[]): Promise<any> {
    return this.service.findOneByField(field, value, currentUser.companyId, ignoreFields)
  }

  @Get('/findManyByField')
  async findManyByField(@CurrentUser() currentUser: User, @Query('field') field: string, @Query('value') value: string, @Query('ignoreFields') ignoreFields: string[]): Promise<any[]> {
    return this.service.findManyByField(field, value, currentUser.companyId, ignoreFields)
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<any> {
    return this.service.findById(+id)
  }

  @Get()
  async findAll(@CurrentUser() currentUser: User): Promise<any[]> {
    return this.service.findAll(currentUser.companyId)
  }
}
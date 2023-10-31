import { Body, Delete, Get, HttpStatus, Injectable, Param, Patch, Post, Query, Res } from '@nestjs/common'
import HttpResponseDto from '@src/shared/dtos/HttpResponseDto'
import { Response } from 'express'
import AbstractRepository from './AbstractRepository'
import AbstractService from './AbstractService'

@Injectable()
export default abstract class AbstractController<
  Service extends AbstractService<Repository>,
  Repository extends AbstractRepository
> {

  constructor(private readonly service: Service, private readonly entityContext?: string) {
    if(!entityContext) entityContext = 'Registro'
  }

  @Post()
  async create(@Body() data: any, @Res() res: Response): Promise<void> {
      await this.service.create(data)
      res.status(HttpStatus.CREATED).json(
        new HttpResponseDto(`${this.entityContext} criado com sucesso`)
      )
  }

  @Patch()
  async update(@Body() data: any, @Res() res: Response): Promise<void> {
    return this.service.update(data)
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
    await this.service.delete(+id)
    res.status(HttpStatus.OK).json(
      new HttpResponseDto(`${this.entityContext} deletado com sucesso.`)
    )
  }

  @Get('/findOneByField')
  async findOneByField(
    @Query('field') field: string,
    @Query('value') value: string,
    @Query('ignoreFields') ignoreFields: string[],
    @Res() res: Response
  ): Promise<any> {
    return this.service.findOneByField(field, value, ignoreFields)
  }

  @Get('/findManyByField')
  async findManyByField(
    @Query('field') field: string,
    @Query('value') value: string,
    @Query('ignoreFields') ignoreFields: string[],
    @Res() res: Response
  ): Promise<any[]> {
    return this.service.findManyByField(field, value, ignoreFields)
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response): Promise<any> {
    return this.service.findById(+id)
  }

  @Get()
  async findAll( @Res() res: Response): Promise<any[]> {
    return this.service.findAll()
  }
}

import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IsPublic } from '@src/shared/decorators/is-public.decorator';
import IUseCase from './IUseCase';


export default abstract class AbstractController<C, U, R> {
  constructor(
    protected readonly createService: IUseCase<C, void>,
    protected readonly updateService: IUseCase<{ id: number; data: U }, void>,
    protected readonly deleteService: IUseCase<number, void>,
    protected readonly findAllService: IUseCase<void, R[]>,
    protected readonly findByIdService: IUseCase<number, R>
  ) {}

  @Post()
  @IsPublic()
  async create(@Body() data: C): Promise<void> {
    await this.createService.execute(data)
  }

  @Patch()
  async update(@Query('id') id: number, @Body() data: any): Promise<void> {
    await this.updateService.execute({ id, data })
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.deleteService.execute(id)
  }

 @Get()
  async findAll(): Promise<R[]> {
    return await this.findAllService.execute()
  }

 @Get(':id')
  async findById(@Param('id') id: number): Promise<R> {
    return await this.findByIdService.execute(id)
  }
}

const fs = require('fs')

function generateRepositoryClass(className) {
  const classNameLowerCase = className.charAt(0).toLowerCase() + className.slice(1)

  const entityTemplate = `
  import { Prisma } from '@prisma/client'

  export default class ${className}Model implements Prisma.${className}UncheckedCreateInput {}
`
  const dtoCreateTemplate = `
export default class ${className}CreateDto {}
`
  const dtoUpdateTemplate = `export default class ${className}UpdateDto {}`
  const dtoResponseTemplate = `export default class ${className}ResponseDto {}`

  const repositoryTemplate = `
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import AbstractRepository from '@src/interfaces/Repository.abstract'
import  ${className}  from './${className}.model'

@Injectable()
export default class  ${className}Repository extends AbstractRepository<${className} >{
  constructor() {
   super(Prisma.ModelName.${className})
  }
}
`

  const createTemplate = `
import { Injectable } from '@nestjs/common';
import ${className}Repository from '../${className}.repository';
import IUseCase from '@src/interfaces/IUseCase';
import ${className}CreateDto from '../dtos/${className}Create.dto'
import { Builder } from 'builder-pattern'
import ${className}Model from '../${className}.model'

@Injectable()
export default class ${className}CreateService implements IUseCase<${className}CreateDto, void>{
  constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

  async execute(input: ${className}CreateDto): Promise<void> {
    const model = Builder<${className}Model>()
    //dto to model
    .build();
    await this.${classNameLowerCase}Repository.create(model)
  }
}
`

  const updateTemplate = `
import { Injectable } from '@nestjs/common';
import ${className}Repository from '../${className}.repository';
import IUseCase from '@src/interfaces/IUseCase';
import ${className}UpdateDto from '../dtos/${className}Update.dto'
import { Builder } from 'builder-pattern'
import ${className}Model from '../${className}.model'

interface Input {
  id: number;
  data: ${className}UpdateDto
}

@Injectable()
export default class ${className}UpdateService implements IUseCase<Input, void>{
  constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

  async execute(input: Input): Promise<void> {
    const model = Builder<${className}Model>()
    //dto to model
    .build();
    await this.${classNameLowerCase}Repository.update(input.id, model)
  }
}
`

  const deleteTemplate = `
import { Injectable } from '@nestjs/common';
import ${className}Repository from '../${className}.repository';
import IUseCase from '@src/interfaces/IUseCase';

@Injectable()
export default class ${className}UpdateService implements IUseCase<number, void>{
  constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

  async execute(id: number): Promise<void> {
    await this.${classNameLowerCase}Repository.delete(id)
  }
}`

  const findByIdTemplate = `
import { Injectable } from '@nestjs/common';
import ${className}Repository from '../${className}.repository';
import IUseCase from '@src/interfaces/IUseCase';
import ${className}ResponseDto from '../dtos/${className}Response.dto'

@Injectable()
export default class ${className}FindByIdService implements IUseCase<number, ${className}ResponseDto>{
  constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

  async execute(id: number): Promise<${className}ResponseDto> {
    return await this.${classNameLowerCase}Repository.findById(id) as ${className}ResponseDto;
  }
}
`

  const findAllTemplate = `
import { Injectable } from '@nestjs/common';
import ${className}Repository from '../${className}.repository';
import IUseCase from '@src/interfaces/IUseCase';
import ${className}ResponseDto from '../dtos/${className}Response.dto'

@Injectable()
export default class ${className}FindAllService implements IUseCase<void, ${className}ResponseDto[]>{
  constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

  async execute(): Promise<${className}ResponseDto[]> {
    return await this.${classNameLowerCase}Repository.findAll() as ${className}ResponseDto[]
  }
}
`

  const controllerTemplate = `
import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import ${className}CreateService from './use-cases/${className}Create.service'
import ${className}DeleteService from './use-cases/${className}Delete.service'
import ${className}UpdateService from './use-cases/${className}Update.service'
import ${className}FindByIdService from './use-cases/${className}FindById.service'
import ${className}FindAllService from './use-cases/${className}FindAll.service'

@ApiTags('${classNameLowerCase}')
@Controller()
export default class ${className}Controller{

  constructor(
    private readonly ${classNameLowerCase}CreateService: ${className}CreateService, 
    private readonly ${classNameLowerCase}UpdateService: ${className}UpdateService, 
    private readonly ${classNameLowerCase}DeleteService: ${className}DeleteService,
    private readonly ${classNameLowerCase}FindById: ${className}FindByIdService, 
    private readonly ${classNameLowerCase}FindAll: ${className}FindAllService) {}

  @Post()
  async create(data: any): Promise<void> {
      await this.${classNameLowerCase}CreateService.execute(data)
  }

  @Patch()
  async update(@Query('id') id: number, data: any): Promise<void> {
    await this.${classNameLowerCase}UpdateService.execute({id, data})
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
     await this.${classNameLowerCase}DeleteService.execute(id)
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<any> {
     return await this.${classNameLowerCase}FindById.execute(id)
  }
}
`

  const moduleTemplate = `
  import { Module } from '@nestjs/common';
  import ${className}Controller from './${className}.controller';
  import ${className}CreateService from './use-cases/${className}Create.service';
  import ${className}UpdateService from './use-cases/${className}Update.service';
  import ${className}DeleteService from './use-cases/${className}Delete.service';
  import ${className}FindByIdService from './use-cases/${className}FindById.service';
  import ${className}Repository from './${className}.repository';

  @Module({
    controllers: [${className}Controller],
    providers: [
      ${className}CreateService, 
      ${className}UpdateService, 
      ${className}DeleteService, 
      ${className}FindByIdService, 
      ${className}Repository
    ],
  })
  export default class ${className}Module {}
  `

  try {
    fs.mkdirSync(`./src/${classNameLowerCase}`)
    fs.mkdirSync(`./src/${classNameLowerCase}/use-cases`)
    fs.mkdirSync(`./src/${classNameLowerCase}/dtos`)

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.model.ts`, entityTemplate, 'utf-8')
    console.log(`${className}Model gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/${className}Create.dto.ts`, dtoCreateTemplate, 'utf-8')
    console.log(`${className}CreateDto gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/${className}Update.dto.ts`, dtoUpdateTemplate, 'utf-8')
    console.log(`${className}UpdateDto gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/${className}Response.dto.ts`, dtoResponseTemplate, 'utf-8')
    console.log(`${className}ResponseDto gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.repository.ts`, repositoryTemplate, 'utf-8')
    console.log(`${className}Repository gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}Create.service.ts`, createTemplate, 'utf-8')
    console.log(`${className}Create gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}Update.service.ts`, updateTemplate, 'utf-8')
    console.log(`${className}Update gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}Delete.service.ts`, deleteTemplate, 'utf-8')
    console.log(`${className}Delete gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}FindById.service.ts`, findByIdTemplate, 'utf-8')
    console.log(`${className}FindById gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}FindAll.service.ts`, findAllTemplate, 'utf-8')
    console.log(`${className}FindAll gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.controller.ts`, controllerTemplate, 'utf-8')
    console.log(`${className}Controller gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.module.ts`, moduleTemplate, 'utf-8')
    console.log(`${className}Module gerado com sucesso.`)
  } catch (err) {
    console.error('Error generating class:', err)
  }
}

const className = process.argv[2]

if (!className) {
  console.error('Please provide a class name as an argument.')
} else {
  generateRepositoryClass(className)
}

const fs = require('fs')

function generate(className) {
  const classNameLowerCase = className.charAt(0).toLowerCase() + className.slice(1)

  /* const entityTemplate = `
  import { Prisma } from '@prisma/client'

  export default class ${className}Model implements Prisma.${className}UncheckedCreateInput {}
` */
  const dtoCreateTemplate = `
  import { ApiProperty } from '@nestjs/swagger'
  import { IsNotEmpty } from 'class-validator'
  import { ${className}SwaggerProperties } from './SwaggerProperties'

  export default class ${className}CreateDto {
    @IsNotEmpty()
    @ApiProperty(${className}SwaggerProperties.field)
    field: any
  }
  `
  const dtoUpdateTemplate = `
  import { ApiProperty } from '@nestjs/swagger'
  import { IsOptional } from 'class-validator'
  import { ${className}SwaggerProperties } from './SwaggerProperties'

  export default class ${className}UpdateDto {
    @IsOptional()
    @ApiProperty(${className}SwaggerProperties.field)
    field: any
  }`
  const dtoDeleteTemplate = `
  import { IsNotEmpty, IsNumberString } from 'class-validator';
  import { ${className}DtoErrorMessages } from './ErrorMessages.enum';
  import { ApiProperty } from '@nestjs/swagger';
  export default class ${className}DeleteDto {
    @IsNumberString()
    @IsNotEmpty({
      message: ${className}DtoErrorMessages.ID_IS_NOT_EMPTY
    })
    @ApiProperty({ example: '1', description: 'Id do registro a ser deletado' })
    id: number;
  }`
  const dtoResponseTemplate = `export default class ${className}ResponseDto {}`
  const dtoSwaggerProperties = `export const ${className}SwaggerProperties = {
    field: { example: 'Jhon Wick', description: 'Example description' }
  }`
  const dtoErrorMessages = `export enum ${className}DtoErrorMessages {
    ID_IS_NOT_EMPTY = 'Campo id é obrigatório.'
  }`

  const repositoryTemplate = `
  import { Injectable } from '@nestjs/common'
  import { Prisma } from '@prisma/client'
  import { now } from '@src/shared/utils/DateUtils'
  import AbstractRepository from '@shared/interfaces/Repository.abstract'
  import ${className}CreateDto from './dtos/${className}Create.dto'
import ${className}UpdateDto from './dtos/${className}Update.dto'

  @Injectable()
  export default class  ${className}Repository extends AbstractRepository {
    constructor() {
    super(Prisma.ModelName.${className})
    }

    async create(data: ${className}CreateDto): Promise<void> {
    const ${classNameLowerCase}Created = await this.prismaService.${classNameLowerCase}.create({
      data
    })

    await this.createAudit(null, ${classNameLowerCase}Created)
  }

  async update(id: number, data: ${className}UpdateDto): Promise<void> {
    const beforeData = await this.prismaService.${classNameLowerCase}.findUnique({ where: { id } })

    const ${classNameLowerCase}Updated = await this.prismaService.${classNameLowerCase}.update({
      where: {
        id: id
      },
      data: { ...data, updatedAt: now() }
    })

    await this.createAudit(beforeData, ${classNameLowerCase}Updated)
  }

  async delete(id: number): Promise<void> {
    const beforeData = await this.prismaService.${classNameLowerCase}.findUnique({ where: { id } })

    await this.prismaService.${classNameLowerCase}.delete({
      where: {
        id
      }
    })

    await this.createAudit(beforeData, null)
  }

  async findById(id: number) {
    return await this.prismaService.${classNameLowerCase}.findUnique({
      where: {
        id
      }
    })
  }

  async findAll() {
    return await this.prismaService.${classNameLowerCase}.findMany()
  }
  }
  `

  const createTemplate = `
  import { Injectable } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import IUseCase from '@shared/interfaces/UseCase.interface';
  import ${className}CreateDto from '../dtos/${className}Create.dto'

  @Injectable()
  export default class ${className}Create implements IUseCase<${className}CreateDto, void>{

    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(input: ${className}CreateDto): Promise<void> {
      await this.${classNameLowerCase}Repository.create(input)
    }
  }
  `

  const updateTemplate = `
  import { Injectable } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import IUseCase from '@shared/interfaces/UseCase.interface';
  import ${className}UpdateDto from '../dtos/${className}Update.dto'
  import { HttpMessages } from '@shared/http-messages/HttpMessages'
  import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'

  @Injectable()
  export default class ${className}Update implements IUseCase {
    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(id: number, data: ${className}UpdateDto): Promise<void> {
      if (!(await this.${classNameLowerCase}Repository.validateExistId(input.id))) {
      throw new HttpNotFoundException(HttpMessages.ID_NOT_EXIST)
    }

       await this.${classNameLowerCase}Repository.update(id, data)
    }
  }
  `

  const deleteTemplate = `
  import { Injectable } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import { HttpMessages } from '@shared/http-messages/HttpMessages'
  import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
  import IUseCase from '@shared/interfaces/UseCase.interface';

  @Injectable()
  export default class ${className}Delete implements IUseCase {

    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(id: number): Promise<void> {
       if (!(await this.${classNameLowerCase}Repository.validateExistId(id))) {
          throw new HttpNotFoundException(HttpMessages.RECORD_NOT_FOUND)
        }

      await this.${classNameLowerCase}Repository.delete(id)
    }
  }`

  const findByIdTemplate = `
  import { Injectable } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import { HttpMessages } from '@shared/http-messages/HttpMessages'
  import { HttpNotFoundException } from '@src/shared/exceptions/HttpNotFound.exception'
  import IUseCase from '@shared/interfaces/UseCase.interface';
  import ${className}ResponseDto from '../dtos/${className}Response.dto'

  @Injectable()
  export default class ${className}FindById implements IUseCase {
    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(id: number): Promise<${className}ResponseDto> {
      const ${classNameLowerCase} = await this.${classNameLowerCase}Repository.findById(id)

      if(${classNameLowerCase}) {
        return ${classNameLowerCase}
      } else {
         throw new HttpNotFoundException(HttpMessages.ID_NOT_EXIST)
      }
    }
  }
  `

  const findAllTemplate = `
  import { Injectable } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import IUseCase from '@shared/interfaces/UseCase.interface';
  import ${className}ResponseDto from '../dtos/${className}Response.dto'

  @Injectable()
  export default class ${className}FindAll implements IUseCase {
    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(): Promise<${className}ResponseDto[]> {
        return await this.${classNameLowerCase}Repository.findAll()
    }
  }
  `

  const controllerTemplate = `
  import { Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Body } from '@nestjs/common'
  import { ApiResponse, ApiTags } from '@nestjs/swagger'
  import  IController from '@shared/interfaces/Controller.interface'
  import ${className}Create from './use-cases/${className}Create.usecase'
  import ${className}Delete from './use-cases/${className}Delete.usecase'
  import ${className}Update from './use-cases/${className}Update.usecase'
  import ${className}FindById from './use-cases/${className}FindById.usecase'
  import ${className}FindAll from './use-cases/${className}FindAll.usecase'
  import ${className}CreateDto from './dtos/${className}Create.dto'
  import ${className}DeleteDto from './dtos/${className}Delete.dto'
  import ${className}UpdateDto from './dtos/${className}Update.dto'
  import ${className}ResponseDto from './dtos/${className}Response.dto'

  @ApiTags('${classNameLowerCase}')
  @Controller()
  export default class ${className}Controller implements IController<${className}CreateDto, ${className}UpdateDto, ${className}DeleteDto, ${className}ResponseDto> {

    constructor(
      readonly ${classNameLowerCase}Create: ${className}Create, 
      readonly ${classNameLowerCase}Update: ${className}Update, 
      readonly ${classNameLowerCase}Delete: ${className}Delete,
      readonly ${classNameLowerCase}FindById: ${className}FindById, 
      readonly ${classNameLowerCase}FindAll: ${className}FindAll) {}

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED })
    async create(@Body() data: ${className}CreateDto): Promise<void> {
      await this.${classNameLowerCase}Create.execute(data)
    }

    @Patch('id/:id')
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    async update(@Param('id') id: number, @Body() data: ${className}UpdateDto): Promise<void> {
      await this.${classNameLowerCase}Update.execute( id, data )
    }

    @Delete('id/:id')
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    async delete(@Param() params: ${className}DeleteDto): Promise<void> {
      await this.${classNameLowerCase}Delete.execute(+params.id)
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [${className}ResponseDto] })
    async findAll(): Promise<${className}ResponseDto[]> {
      return await this.${classNameLowerCase}FindAll.execute()
    }

    @Get('id/:id')
    @ApiResponse({ status: HttpStatus.OK, type: ${className}ResponseDto })
    async findById(@Param('id') id: number): Promise<${className}ResponseDto> {
      return await this.${classNameLowerCase}FindById.execute(+id)
    }
  }
  `

  const moduleTemplate = `
  import { Module } from '@nestjs/common';
  import PrismaModule from '@src/infra/persistence/Prisma.module'
  import { UserContext } from '@src/modules/aux/contexts/User.context';
  import ${className}Controller from './${className}.controller';
  import ${className}Create from './use-cases/${className}Create.usecase';
  import ${className}Update from './use-cases/${className}Update.usecase';
  import ${className}Delete from './use-cases/${className}Delete.usecase';
  import ${className}FindById from './use-cases/${className}FindById.usecase';
  import ${className}FindAll from './use-cases/${className}FindAll.usecase';
  import ${className}Repository from './${className}.repository';

  @Module({
    imports: [PrismaModule],
    controllers: [${className}Controller],
    providers: [
      ${className}Create, 
      ${className}Update, 
      ${className}Delete, 
      ${className}FindById, 
      ${className}FindAll,
      ${className}Repository,
      UserContext
    ],
  })
  export default class ${className}Module {}
  `

  try {
    fs.mkdirSync(`./src/${classNameLowerCase}`)
    fs.mkdirSync(`./src/${classNameLowerCase}/use-cases`)
    fs.mkdirSync(`./src/${classNameLowerCase}/dtos`)

    /* fs.writeFileSync(`./src/${classNameLowerCase}/${className}.model.ts`, entityTemplate, 'utf-8')
    console.log(`${className}Model gerado com sucesso.`) */

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/${className}Create.dto.ts`, dtoCreateTemplate, 'utf-8')
    console.log(`${className}CreateDto gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/${className}Update.dto.ts`, dtoUpdateTemplate, 'utf-8')
    console.log(`${className}UpdateDto gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/${className}Delete.dto.ts`, dtoDeleteTemplate, 'utf-8')
    console.log(`${className}DeleteDto gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/${className}Response.dto.ts`, dtoResponseTemplate, 'utf-8')
    console.log(`${className}ResponseDto gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/SwaggerProperties.ts`, dtoSwaggerProperties, 'utf-8')
    console.log(`${className}DtoSwaggerProperties gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/dtos/ErrorMessages.enum.ts`, dtoErrorMessages, 'utf-8')
    console.log(`${className}DtoErrorMessages gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.repository.ts`, repositoryTemplate, 'utf-8')
    console.log(`${className}Repository gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}Create.usecase.ts`, createTemplate, 'utf-8')
    console.log(`${className}Create gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}Update.usecase.ts`, updateTemplate, 'utf-8')
    console.log(`${className}Update gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}Delete.usecase.ts`, deleteTemplate, 'utf-8')
    console.log(`${className}Delete gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}FindById.usecase.ts`, findByIdTemplate, 'utf-8')
    console.log(`${className}FindById gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/use-cases/${className}FindAll.usecase.ts`, findAllTemplate, 'utf-8')
    console.log(`${className}FindAll gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.controller.ts`, controllerTemplate, 'utf-8')
    console.log(`${className}Controller gerado com sucesso.`)

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.module.ts`, moduleTemplate, 'utf-8')
    console.log(`${className}Module gerado com sucesso.`)
  } catch (err) {
    console.error('Erro ao gerar a classe :', err)
  }
}

const className = process.argv[2]

if (!className) {
  console.error('É necessário informar um parâmetro para o nome da Entidade do CRUD.')
} else {
  generate(className)
}

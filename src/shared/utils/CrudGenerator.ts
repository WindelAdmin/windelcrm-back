const fs = require('fs')

function generate(className) {
  const classNameLowerCase = className.charAt(0).toLowerCase() + className.slice(1)

  const entityTemplate = `
  import { Prisma } from '@prisma/client'

  export default class ${className}Model implements Prisma.${className}UncheckedCreateInput {}
`
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
  import { Injectable, Logger } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import IUseCase from '@src/interfaces/IUseCase';
  import ${className}CreateDto from '../dtos/${className}Create.dto'
  import { Builder } from 'builder-pattern'
  import ${className}Model from '../${className}.model'

  @Injectable()
  export default class ${className}CreateService implements IUseCase<${className}CreateDto, void>{

    private logger = new Logger(${className}CreateService.name)

    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(input: ${className}CreateDto): Promise<void> {
      const model = Builder<${className}Model>(input).build();
      await this.${classNameLowerCase}Repository.create(model).catch((err) => {
        this.logger.error(err)
      })
    }
  }
  `

  const updateTemplate = `
  import { Injectable, Logger } from '@nestjs/common';
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
    private logger = new Logger(${className}UpdateService.name)

    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(input: Input): Promise<void> {
      const model = Builder<${className}Model>(input.data).build();
      await this.${classNameLowerCase}Repository.update(input.id, model).catch((err) => {
        this.logger.error(err)
      })
    }
  }
  `

  const deleteTemplate = `
  import { Injectable, Logger } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import IUseCase from '@src/interfaces/IUseCase';

  @Injectable()
  export default class ${className}DeleteService implements IUseCase<number, void>{

    private logger = new Logger(${className}DeleteService.name)

    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(id: number): Promise<void> {
      await this.${classNameLowerCase}Repository.delete(id).catch((err) => {
        this.logger.error(err)
      })
    }
  }`

  const findByIdTemplate = `
  import { Injectable, Logger } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import IUseCase from '@src/interfaces/IUseCase';
  import ${className}ResponseDto from '../dtos/${className}Response.dto'

  @Injectable()
  export default class ${className}FindByIdService implements IUseCase<number, ${className}ResponseDto>{
    private logger = new Logger(${className}FindByIdService.name)

    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(id: number): Promise<${className}ResponseDto> {
      return await this.${classNameLowerCase}Repository.findById(id).catch((err) => {
        this.logger.error(err)
      }) as ${className}ResponseDto;
    }
  }
  `

  const findAllTemplate = `
  import { Injectable, Logger } from '@nestjs/common';
  import ${className}Repository from '../${className}.repository';
  import IUseCase from '@src/interfaces/IUseCase';
  import ${className}ResponseDto from '../dtos/${className}Response.dto'

  @Injectable()
  export default class ${className}FindAllService implements IUseCase<void, ${className}ResponseDto[]>{
    private logger = new Logger(${className}FindAllService.name)

    constructor(private readonly ${classNameLowerCase}Repository: ${className}Repository){}

    async execute(): Promise<${className}ResponseDto[]> {
      return await this.${classNameLowerCase}Repository.findAll().catch((err) => {
        this.logger.error(err)
      }) as ${className}ResponseDto[]
    }
  }
  `

  const controllerTemplate = `
  import { Controller, Delete, Get, Param, Patch, Post, Query, Body } from '@nestjs/common'
  import { ApiBody, ApiTags } from '@nestjs/swagger'
  import  IController from '@src/interfaces/Controller.interface'
  import ${className}CreateService from './use-cases/${className}Create.service'
  import ${className}DeleteService from './use-cases/${className}Delete.service'
  import ${className}UpdateService from './use-cases/${className}Update.service'
  import ${className}FindByIdService from './use-cases/${className}FindById.service'
  import ${className}FindAllService from './use-cases/${className}FindAll.service'
  import ${className}CreateDto from './dtos/${className}Create.dto'
  import ${className}DeleteDto from './dtos/${className}Delete.dto'
  import ${className}UpdateDto from './dtos/${className}Update.dto'
  import ${className}ResponseDto from './dtos/${className}Response.dto'

  @ApiTags('${classNameLowerCase}')
  @Controller()
  export default class ${className}Controller implements IController<${className}CreateDto, ${className}UpdateDto, ${className}DeleteDto, ${className}ResponseDto> {

    constructor(
      readonly ${classNameLowerCase}CreateService: ${className}CreateService, 
      readonly ${classNameLowerCase}UpdateService: ${className}UpdateService, 
      readonly ${classNameLowerCase}DeleteService: ${className}DeleteService,
      readonly ${classNameLowerCase}FindByIdService: ${className}FindByIdService, 
      readonly ${classNameLowerCase}FindAllService: ${className}FindAllService) {}

    @Post()
    @ApiBody({ type: ${className}CreateDto })
    async create(@Body() data: ${className}CreateDto): Promise<void> {
      await this.${classNameLowerCase}CreateService.execute(data)
    }

    @Patch()
    @ApiBody({ type: ${className}UpdateDto })
    async update(@Query('id') id: number, @Body() data: ${className}UpdateDto): Promise<void> {
      await this.${classNameLowerCase}UpdateService.execute({ id, data })
    }

    @Delete(':id')
    @ApiBody({ type: ${className}DeleteDto })
    async delete(@Param() params: ${className}DeleteDto): Promise<void> {
      await this.${classNameLowerCase}DeleteService.execute(+params.id)
    }

    @Get()
    async findAll(): Promise<${className}ResponseDto[]> {
      return await this.${classNameLowerCase}FindAllService.execute()
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<${className}ResponseDto> {
      return await this.${classNameLowerCase}FindByIdService.execute(+id)
    }
  }
  `

  const moduleTemplate = `
  import { Module } from '@nestjs/common';
  import PrismaModule from '@src/infra/persistence/Prisma.module'
  import { UserContext } from '@src/modules/context/UserContext';
  import ${className}Controller from './${className}.controller';
  import ${className}CreateService from './use-cases/${className}Create.service';
  import ${className}UpdateService from './use-cases/${className}Update.service';
  import ${className}DeleteService from './use-cases/${className}Delete.service';
  import ${className}FindByIdService from './use-cases/${className}FindById.service';
  import ${className}FindAllService from './use-cases/${className}FindAll.service';
  import ${className}Repository from './${className}.repository';

  @Module({
    imports: [PrismaModule],
    controllers: [${className}Controller],
    providers: [
      ${className}CreateService, 
      ${className}UpdateService, 
      ${className}DeleteService, 
      ${className}FindByIdService, 
      ${className}FindAllService,
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

    fs.writeFileSync(`./src/${classNameLowerCase}/${className}.model.ts`, entityTemplate, 'utf-8')
    console.log(`${className}Model gerado com sucesso.`)

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
    console.error('Erro ao gerar a classe :', err)
  }
}

const className = process.argv[2]

if (!className) {
  console.error('É necessário informar um parâmetro para o nome da Entidade do CRUD.')
} else {
  generate(className)
}

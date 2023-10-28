import { SetMetadata } from '@nestjs/common'

export const EntityName = (entityName: string) => SetMetadata('entityName', entityName)

import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper({
    '@src/*': ['src/*'],
    '@modules/*': ['src/modules/*'],
    '@infra/*': ['src/infra/*'],
    '@shared/*': ['src/shared/*']
  })
}

export default jestConfig

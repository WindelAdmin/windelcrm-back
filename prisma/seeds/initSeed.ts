import { PrismaClient } from '@prisma/client'
import { CryptoService } from '@src/modules/crypto/Crypto.service'

const cryptoService = new CryptoService()
const prisma = new PrismaClient()

async function seedUser() {
  const companyData = {
    id: 1,
    name: 'Nome da Empresa',
    fantasyName: 'Nome Fantasia da Empresa',
    cpfCnpj: '12345678901',
    phone: '123-456-7890',
    email: 'empresa@example.com',
    cep: '12345-678',
    street: 'Rua da Empresa',
    number: '123',
    complement: 'Apt 123',
    city: 'Cidade da Empresa',
    uf: 'UF',
    type: 'Tipo da Empresa',
    isActive: true,
    createdAt: '2023-11-10T20:08:16.348Z',
    updatedAt: '2023-11-10T20:08:16.348Z'
  }

  const permissionData = {
    description: 'Master',
    type: 'R',
    isActive: true
  }

  const userData = {
    name: 'Master',
    email: 'master@outlook.com',
    password: await cryptoService.encrypt('1q2w3e4r'),
    companyId: 1
  }

  await prisma.company.create({
    data: companyData
  })

  await prisma.user.create({
    data: userData
  })

  await prisma.permission.create({
    data: permissionData
  })
}

async function main() {
  await seedUser()
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

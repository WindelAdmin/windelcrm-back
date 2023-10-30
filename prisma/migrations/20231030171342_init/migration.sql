/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `user_permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `work_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_personId_fkey";

-- DropIndex
DROP INDEX "user_permission_permissionId_key";

-- DropIndex
DROP INDEX "user_permission_userId_key";

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "role" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_permission" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "work_schedule" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "address";

-- CreateTable
CREATE TABLE "person_address" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "cep" TEXT,
    "street" TEXT,
    "number" TEXT DEFAULT 'S/N',
    "district" TEXT,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "isResidential" BOOLEAN DEFAULT true,
    "isMain" BOOLEAN DEFAULT true,
    "personId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "person_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_address_personId_key" ON "person_address"("personId");

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_schedule" ADD CONSTRAINT "work_schedule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_address" ADD CONSTRAINT "person_address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_address" ADD CONSTRAINT "person_address_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

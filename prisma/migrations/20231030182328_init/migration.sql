-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_permissionId_fkey";

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

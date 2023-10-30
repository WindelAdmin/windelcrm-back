-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_userId_fkey";

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

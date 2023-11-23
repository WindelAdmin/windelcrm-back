import { Global, Module } from '@nestjs/common';
import { UserContext } from './User.context';

@Global()
@Module({
  providers: [UserContext],
  exports: [UserContext]
})
export class UserContextModule {}
import { Global, Module } from '@nestjs/common';
import { CryptoService } from './Crypto.service';

@Global()
@Module({
  providers: [CryptoService],
  exports: [CryptoService]
})
export class CryptoModule {}
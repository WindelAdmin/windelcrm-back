// crypto.service.ts
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly secretKey =  process.env.CRYPTO_KEY;
  private readonly iv = randomBytes(16);

  encrypt(text: string): string {
    const cipher = createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    const decipher = createDecipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  compareDecryptedText(encryptedText: string, referenceText: string): boolean {
    const decryptedText = this.decrypt(encryptedText);
    return decryptedText === referenceText;
  }
}

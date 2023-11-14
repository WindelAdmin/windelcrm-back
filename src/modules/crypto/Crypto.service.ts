// crypto.service.ts
import { Injectable } from '@nestjs/common'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-ctr'
  private readonly secretKey = process.env.CRYPTO_KEY
  
  encrypt(text: string): string {
    const iv = randomBytes(16)
    const cipher = createCipheriv(this.algorithm, Buffer.from(this.secretKey), iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return Buffer.from(JSON.stringify({ hash: encrypted, iv: iv })).toString('base64')
  }

  decrypt(encryptedText: string): string {
    const hashObj = JSON.parse(Buffer.from(encryptedText, 'base64').toString())
    const decipher = createDecipheriv(this.algorithm, Buffer.from(this.secretKey), Buffer.from(hashObj.iv))
    let decrypted = decipher.update(hashObj.hash, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }

  compare(encryptedText: string, referenceText: string): boolean {
    const decryptedText = this.decrypt(encryptedText)
    return decryptedText === referenceText
  }
}

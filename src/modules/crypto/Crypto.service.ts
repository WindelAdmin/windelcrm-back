import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
@Injectable()
export class CryptoService {
  aesKey: ArrayBuffer 

  constructor(){
    this.aesKey = this.hexStringToArrayBuffer(process.env.CRYPTO_KEY as string)
  }
  async generateKey(): Promise<CryptoKey | any> {

    if (!this.aesKey) {
      console.error('Chave AES não encontrada ou inválida.')
      return null
    }
    
    try {
      const cryptoKey = await crypto.subtle.importKey('raw', this.aesKey, { name: 'AES-CTR' }, false, ['encrypt', 'decrypt'])

        return cryptoKey
    } catch (error) {
      console.error('Erro ao importar a chave:', error)
    }
  }

  hexStringToArrayBuffer(hexString: string): ArrayBuffer {
    const bufferLength = hexString.length / 2
    const buffer = new ArrayBuffer(bufferLength)
    const uint8Array = new Uint8Array(buffer)

    for (let i = 0; i < bufferLength; i++) {
      const byte = parseInt(hexString.substr(i * 2, 2), 16)
      uint8Array[i] = byte
    }

    return buffer
  }

  arrayBufferToHexString(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer)
    const hexArray = Array.from(byteArray).map((byte) => byte.toString(16).padStart(2, '0'))
    return hexArray.join('')
  }

  async encrypt(data: string): Promise<string> {
    const counter = new Uint8Array(16)
    const encodedData = new TextEncoder().encode(data)

    const encryptedData = await crypto.subtle.encrypt({ name: 'AES-CTR', counter: counter, length: 64 }, await this.generateKey(), encodedData)

    return this.arrayBufferToHexString(encryptedData)
  }

  async decrypt(encryptedData: string) {
    const counter = new Uint8Array(16)
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-CTR', counter: counter, length: 64 },
      await this.generateKey(),
      this.hexStringToArrayBuffer(encryptedData)
    )

    return new TextDecoder('utf-8').decode(decryptedData)
  }

  async compare(data: string, hex: string): Promise<boolean> {
    return await this.encrypt(data) === hex
  }
}

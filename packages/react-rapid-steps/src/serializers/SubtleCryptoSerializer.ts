import { IRapidStepsSerializer } from "../interfaces/IRapidStepsSerializer.interface";
import { IRapidStepsData } from "../interfaces/IRapidStepsData.interface";

export class SubtleCryptoSerializer implements IRapidStepsSerializer {
  private readonly textEncoder = new TextEncoder();
  private readonly textDecoder = new TextDecoder();
  private readonly secretKey: string;
  private cryptoKey: CryptoKey | null = null;
  private iv: Uint8Array;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.iv = new Uint8Array(12);
    this.iv.fill(0);
  }

  private async generateCryptoKey() {
    const secretBuffer = this.textEncoder.encode(this.secretKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', secretBuffer);
    const keyData = new Uint8Array(hashBuffer.slice(0, 16));
    return await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );
  }

  public async serialize(formState: IRapidStepsData) {
    if (!this.cryptoKey) {
      this.cryptoKey = await this.generateCryptoKey();
    }
    const formStateString = JSON.stringify(formState);
    const encodedFormStateString = this.textEncoder.encode(formStateString);
    const encryptedFormState = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: this.iv },
      this.cryptoKey,
      encodedFormStateString
    );
    return Buffer.from(encryptedFormState).toString('base64');
  }

  public async deserialize(serializedFormState: string) {
    try {
      if (!this.cryptoKey) {
        this.cryptoKey = await this.generateCryptoKey();
      }
      const encryptedFormState = Buffer.from(serializedFormState, 'base64');
      const decryptedFormStateString = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: this.iv },
        this.cryptoKey,
        encryptedFormState
      );
      const decryptedFormState = this.textDecoder.decode(decryptedFormStateString);
      return JSON.parse(decryptedFormState);
    } catch (error) {
      return null;
    }
  }
}

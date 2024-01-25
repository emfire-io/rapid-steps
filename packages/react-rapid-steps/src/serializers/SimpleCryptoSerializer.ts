import SimpleCrypto from "simple-crypto-js";
import { IRapidStepsSerializer } from "../interfaces/IRapidStepsSerializer.interface";
import { IRapidStepsData } from "../interfaces/IRapidStepsData.interface";

export class SimpleCryptoSerializer implements IRapidStepsSerializer {
  private readonly simpleCrypto: SimpleCrypto;

  constructor(secretKey: string) {
    this.simpleCrypto = new SimpleCrypto(secretKey);
  }

  serialize(formState: IRapidStepsData): string {
    return this.simpleCrypto.encrypt(formState);
  }

  deserialize(serializedFormState: string): IRapidStepsData {
    return this.simpleCrypto.decrypt(serializedFormState) as IRapidStepsData;
  }
}

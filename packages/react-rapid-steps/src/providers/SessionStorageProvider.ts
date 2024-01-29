import { IRapidStepsData } from "../interfaces/IRapidStepsData.interface";
import { IRapidStepsSerializer } from "../interfaces/IRapidStepsSerializer.interface";
import { IRapidStepsStorageProvider } from "../interfaces/IRapidStepsStorageProvider.interface";

export class SessionStorageProvider implements IRapidStepsStorageProvider {
  private readonly storageKey: string;
  private readonly serializer?: IRapidStepsSerializer;

  constructor(
    storageKey: string,
    serializer?: IRapidStepsSerializer
  ) {
    this.storageKey = storageKey;
    this.serializer = serializer;
  }

  public async save(formState: IRapidStepsData) {
    if (this.serializer) {
      sessionStorage.setItem(this.storageKey, await this.serializer.serialize(formState));
      return;
    }
    sessionStorage.setItem(this.storageKey, JSON.stringify(formState));
  }

  public async load() {
    if (this.serializer) {
      const formState = sessionStorage.getItem(this.storageKey);
      return formState ? await this.serializer.deserialize(formState) : null;
    }
    const formState = sessionStorage.getItem(this.storageKey);
    return formState ? JSON.parse(formState) : null;
  }

  public clear(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}

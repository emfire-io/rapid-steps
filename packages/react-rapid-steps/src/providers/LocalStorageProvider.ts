import { IRapidStepsData } from "../interfaces/IRapidStepsData.interface";
import { IRapidStepsSerializer } from "../interfaces/IRapidStepsSerializer.interface";
import { IRapidStepsStorageProvider } from "../interfaces/IRapidStepsStorageProvider.interface";

export class LocalStorageProvider implements IRapidStepsStorageProvider {
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
      const serializedFormState = await this.serializer.serialize(formState);
      localStorage.setItem(this.storageKey, serializedFormState);
      return;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(formState));
  }

  public async load() {
    if (this.serializer) {
      const formState = localStorage.getItem(this.storageKey);
      return formState ? await this.serializer.deserialize(formState) : null;
    }
    const formState = localStorage.getItem(this.storageKey);
    return formState ? JSON.parse(formState) : null;
  }

  public clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}

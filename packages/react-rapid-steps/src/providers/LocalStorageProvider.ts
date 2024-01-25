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

  public save(formState: IRapidStepsData): void {
    if (this.serializer) {
      localStorage.setItem(this.storageKey, this.serializer.serialize(formState));
      return;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(formState));
  }

  public load(): IRapidStepsData | null {
    if (this.serializer) {
      const formState = localStorage.getItem(this.storageKey);
      return formState ? this.serializer.deserialize(formState) : null;
    }
    const formState = localStorage.getItem(this.storageKey);
    return formState ? JSON.parse(formState) : null;
  }

  public clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}

import { IRapidStepsData } from "../interfaces/IRapidStepsData.interface";
import { IRapidStepsInvalidator } from "../interfaces/IRapidStepsInvalidator.interface";

export class VersionInvalidator implements IRapidStepsInvalidator {
  private readonly version: string;

  constructor (version: string) {
    this.version = version;
  }

  shouldInvalidate (loadedFormState: IRapidStepsData): boolean {
    return loadedFormState.metadata?.version !== this.version
  }

  handleInvalidatedForm (initialFormData: IRapidStepsData, setFormData: (data: IRapidStepsData) => void) {
    setFormData({
      ...initialFormData,
      metadata: {
        ...(initialFormData.metadata ?? {}),
        version: this.version
      }
    });
  }
}
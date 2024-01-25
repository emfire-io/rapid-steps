import { IRapidStepsData } from "./IRapidStepsData.interface";

export interface IRapidStepsInvalidator {
  shouldInvalidate: (loadedFormState: IRapidStepsData) => IRapidStepsData['metadata'] | boolean;
  handleInvalidatedForm: (
    initialFormData: IRapidStepsData,
    setFormData: (data: IRapidStepsData) => void
  ) => void;
}

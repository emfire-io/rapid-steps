import { IRapidStepsData } from "./IRapidStepsData.interface";

export interface IRapidStepsSerializer {
  serialize: (formState: IRapidStepsData) => string;
  deserialize: (serializedFormState: string) => IRapidStepsData;
}

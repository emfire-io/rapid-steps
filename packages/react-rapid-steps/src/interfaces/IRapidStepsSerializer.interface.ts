import { IRapidStepsData } from "./IRapidStepsData.interface";

export interface IRapidStepsSerializer {
  serialize: (formState: IRapidStepsData) => Promise<string>;
  deserialize: (serializedFormState: string) => Promise<IRapidStepsData | null>;
}

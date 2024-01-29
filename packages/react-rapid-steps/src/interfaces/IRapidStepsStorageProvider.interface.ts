import { IRapidStepsData } from "./IRapidStepsData.interface";

export interface IRapidStepsStorageProvider {
  save: (formState: IRapidStepsData) => Promise<void>;
  load: () => Promise<IRapidStepsData | null>;
  clear: () => void;
}

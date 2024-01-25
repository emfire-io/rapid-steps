import { IRapidStepsData } from "./IRapidStepsData.interface";

export interface IRapidStepsStorageProvider {
  save: (formState: IRapidStepsData) => void;
  load: () => IRapidStepsData | null;
  clear: () => void;
}

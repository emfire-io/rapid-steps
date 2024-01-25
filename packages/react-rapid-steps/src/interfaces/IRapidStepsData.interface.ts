export interface IRapidStepsData {
  values: Record<string | number | symbol, unknown>;
  currentStep: number;
  completedSteps?: number;
  metadata?: Record<string | number | symbol, unknown>;
}
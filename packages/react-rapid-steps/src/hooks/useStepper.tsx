import { useCallback } from "react";
import { useRapidStepsContext } from "./useRapidStepsContext";

const useStepper = () => {
  const rapidStepsMethods = useRapidStepsContext();
  const currentStep = rapidStepsMethods?.currentStep ?? 0;
  const goToStep = useCallback(
    (index: number) => {
      if (!rapidStepsMethods) {
        throw new Error('No rapid steps methods');
      }
      const { goToStep } = rapidStepsMethods;
      goToStep(index);
    },
    [rapidStepsMethods]
  );

  return {
    currentStep,
    goToStep,
    numberOfSteps: rapidStepsMethods?.numberOfSteps ?? 0,
  }
}

export default useStepper;

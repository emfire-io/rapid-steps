import { useCallback } from "react";
import { useRapidStepsContext } from "./useRapidStepsContext";

const useNavigation = () => {
  const rapidStepsMethods = useRapidStepsContext();
  const currentStep = rapidStepsMethods?.currentStep ?? 0;
  const numberOfSteps = rapidStepsMethods?.numberOfSteps ?? 0;
  const isPreviousStepDisabled = currentStep === 0;
  const isNextStepDisabled = currentStep === numberOfSteps - 1 || numberOfSteps === 0;
  const isNextStepLoading = rapidStepsMethods?.isNextStepLoading ?? false;
  const goToPreviousStep = useCallback(
    () => {
      if (!rapidStepsMethods) {
        throw new Error('No rapid steps methods');
      }
      const { goToStep } = rapidStepsMethods;
      goToStep(currentStep - 1);
    },
    [currentStep, rapidStepsMethods]
  );
  const goToNextStep = useCallback(
    () => {
      if (!rapidStepsMethods) {
        throw new Error('No rapid steps methods');
      }
      const { goToStep } = rapidStepsMethods;
      goToStep(currentStep + 1);
    },
    [currentStep, rapidStepsMethods]
  );

  return {
    reset: rapidStepsMethods?.reset ?? (() => {}),
    goToPreviousStep,
    goToNextStep,
    isPreviousStepDisabled,
    isNextStepDisabled,
    currentStep,
    isNextStepLoading,
    formId: rapidStepsMethods?.formId ?? '',
    numberOfSteps
  }
}

export default useNavigation;

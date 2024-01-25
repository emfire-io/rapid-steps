import { useCallback } from "react";
import { useRapidStepsContext } from "./useRapidStepsContext";

interface IUseRapidStepParams {
  beforeNextStep?: (values: Record<string | number | symbol, unknown>) => Promise<boolean>;
  onNextStepError?: (error: unknown) => void;
}

const useRapidStep = (params?: IUseRapidStepParams) => {
  const rapidStepsMethods = useRapidStepsContext();
  const values = rapidStepsMethods?.values;
  const onSubmit = useCallback(async (values: Record<string | number | symbol, unknown>) => {
    if (!rapidStepsMethods) {
      throw new Error('No rapid steps methods');
    }
    const { currentStep, setIsNextStepLoading } = rapidStepsMethods;
    let shouldContinue = true;
    if (params?.beforeNextStep) {
      setIsNextStepLoading(true);
      try {
        shouldContinue = await params.beforeNextStep(values);
      } catch (error) {
        params.onNextStepError?.(error);
        return;
      } finally {
        setIsNextStepLoading(false);
      }
    }
    rapidStepsMethods.setFormData({
      values,
      currentStep: shouldContinue ? currentStep + 1 : currentStep,
    });
  }, [params, rapidStepsMethods])

  return {
    onSubmit,
    isNextStepLoading: Boolean(rapidStepsMethods?.isNextStepLoading),
    values,
    formId: rapidStepsMethods?.formId,
  }
}

export default useRapidStep;

import { useCallback, useEffect, useMemo, useState } from "react";
import { IRapidStepsStorageProvider } from "../interfaces/IRapidStepsStorageProvider.interface";
import { IRapidStepsData } from "../interfaces/IRapidStepsData.interface";
import { IRapidStepsInvalidator } from "../interfaces/IRapidStepsInvalidator.interface";

type UseRapidStepsParams = {
  initialValues: Record<string | number | symbol, unknown>;
  storageProvider: IRapidStepsStorageProvider;
  formId: string;
  invalidator?: IRapidStepsInvalidator;
  metadata?: Record<string | number | symbol, unknown>;
}

const useRapidSteps = ({
  initialValues,
  storageProvider,
  formId,
  invalidator,
  metadata
}: UseRapidStepsParams) => {
  const initialFormData = useMemo<IRapidStepsData>(() => ({
    values: initialValues,
    currentStep: 0,
    metadata
  }), [initialValues, metadata]);
  const [formData, _setFormData] = useState<IRapidStepsData>(initialFormData);
  const [isFormDataLoaded, setIsFormDataLoaded] = useState(false);
  const [numberOfSteps, setNumberOfSteps] = useState(0);
  const [isNextStepLoading, setIsNextStepLoading] = useState(false);

  const currentStep = formData.currentStep;
  const setFormData = useCallback(({ values: newValues, currentStep: newCurrentStep, metadata: newMetadata }: Partial<IRapidStepsData>) => {
    const newData = {
      values: {
        ...formData.values,
        ...newValues,
      },
      currentStep: typeof newCurrentStep === "number" ? newCurrentStep : currentStep,
      metadata: newMetadata || formData.metadata || metadata,
    }
    storageProvider.save(newData);
    _setFormData(newData);
  }, [formData.values, formData.metadata, currentStep, metadata, storageProvider])
  const reset = useCallback(() => {
    setFormData(initialFormData)
    return initialFormData;
  }, [initialFormData, setFormData]);
  const goToStep = useCallback((index: number) => {
    setFormData({
      currentStep: index,
    })
  }, [setFormData]);
  useEffect(() => {
    storageProvider.load()?.then(loadedData => {
      if (!loadedData) {
        storageProvider.save(initialFormData);
        return;
      }
      _setFormData(loadedData);
      setIsFormDataLoaded(true);
    })
  }, [initialFormData, storageProvider])

  useEffect(() => {
    if (!invalidator || !isFormDataLoaded) return
    const shouldInvalidate = invalidator.shouldInvalidate(formData);
    if (!shouldInvalidate) return
    invalidator.handleInvalidatedForm(initialFormData, setFormData)
  }, [formData, invalidator, setFormData, initialFormData, isFormDataLoaded])

  return {
    values: formData.values,
    currentStep,
    numberOfSteps,
    isNextStepLoading,
    setIsNextStepLoading,
    setNumberOfSteps,
    setFormData,
    reset,
    goToStep,
    formId
  }
};

export default useRapidSteps;

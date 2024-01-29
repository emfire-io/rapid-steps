import { act, renderHook, waitFor } from "@testing-library/react";
import {RapidStepsWrapper, useNavigation} from "..";
import { LocalStorageProvider, RapidStepsProvider, useRapidSteps } from "..";
import React, { ReactElement } from "react";

const initialValues = { name: '' }
const storageProvider = new LocalStorageProvider('test-form');

beforeEach(() => {
  storageProvider.clear();
})

test('throws error on missing context', async () => {
  const { result } = renderHook(useNavigation);
  act(() => {
    expect(result.current.goToNextStep).toThrow(Error);
    expect(result.current.goToPreviousStep).toThrow(Error);
  })
})

test('goes to the next step then goes back', async () => {
  const Wrapper = ({ children }: { children: ReactElement }) => {
    const rapidStepsMethods = useRapidSteps({
      initialValues,
      storageProvider,
      formId: 'test-form',
    })

    return (
      <RapidStepsProvider {...rapidStepsMethods}>
        <>
          {children}
          <RapidStepsWrapper>
            <div />
            <div />
          </RapidStepsWrapper>
        </>
      </RapidStepsProvider>
    )
  };
  const { result } = renderHook(useNavigation, { wrapper: Wrapper });
  await waitFor(() => {
    expect(result.current.numberOfSteps).toBe(2);
  });

  expect(result.current.currentStep).toBe(0);
  expect(result.current.isNextStepDisabled).toBe(false);
  expect(result.current.isPreviousStepDisabled).toBe(true);

  act(() => {
    result.current.goToNextStep();
  });

  expect(result.current.currentStep).toBe(1);
  expect(result.current.isNextStepDisabled).toBe(true);
  expect(result.current.isPreviousStepDisabled).toBe(false);

  act(() => {
    result.current.goToPreviousStep();
  });

  expect(result.current.currentStep).toBe(0);
  expect(result.current.isNextStepDisabled).toBe(false);
  expect(result.current.isPreviousStepDisabled).toBe(true);
})

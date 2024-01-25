import { act, renderHook, waitFor } from "@testing-library/react";
import {RapidStepsWrapper, useStepper} from "../src";
import { LocalStorageProvider, RapidStepsProvider, useRapidSteps } from "../src";
import React, { ReactElement } from "react";

const initialValues = { name: '' }
const storageProvider = new LocalStorageProvider('test-form');

test('goes to first step, returns the current step', async () => {
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
  const { result } = renderHook(useStepper, { wrapper: Wrapper });
  await waitFor(() => {
    expect(result.current.numberOfSteps).toBe(2);
  });

  expect(result.current.currentStep).toBe(0);

  act(() => {
    result.current.goToStep(1);
  });

  expect(result.current.currentStep).toBe(1);
})

test('throws error on missing context', async () => {
  const { result } = renderHook(useStepper);
  act(() => {
    expect(result.current.goToStep).toThrow(Error);
  })
})
import React, { ReactElement } from "react";
import { RapidStepsProvider, RapidStepsWrapper, useRapidStep, useRapidSteps } from "..";
import { act, renderHook, waitFor } from "@testing-library/react";

const storageProvider = {
  save: jest.fn(),
  load: jest.fn(),
  clear: jest.fn(),
}

const initialValues = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
}
const newValues = {
  firstName: 'John',
  lastName: 'Doe',
  address1: 'Address 1',
  address2: 'Address 2',
}
const onNextStepError = jest.fn()

test('submits with beforeNextStep and should not continue', async () => {
  let rapidStepsMethods: ReturnType<typeof useRapidSteps> | undefined
  const Wrapper = ({ children }: { children: ReactElement }) => {
    rapidStepsMethods = useRapidSteps({
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
  const { result } = renderHook(
    () => useRapidStep({
      beforeNextStep: async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return false
      },
    }),
    { wrapper: Wrapper }
  );

  act(() => {
    result.current.onSubmit(newValues);
  })

  expect(result.current.isNextStepLoading).toBe(true);

  await waitFor(() => {
    expect(result.current.isNextStepLoading).toBe(false);
  }, { timeout: 200 })
  expect(rapidStepsMethods).not.toBeUndefined();
  expect(rapidStepsMethods?.currentStep).toBe(0);
  expect(result.current.values).toMatchObject(newValues);
})

test('submits with beforeNextStep and should continue', async () => {
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
  const { result } = renderHook(
    () => useRapidStep({
      beforeNextStep: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return true
      },
    }),
    { wrapper: Wrapper }
  );

  act(() => {
    result.current.onSubmit(newValues);
  })

  expect(result.current.isNextStepLoading).toBe(true);

  await waitFor(() => {
    expect(result.current.isNextStepLoading).toBe(false);
  }, { timeout: 1500 })

  expect(result.current.values).toMatchObject(newValues);
})

test('submits with beforeNextStep then errors', async () => {
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
  const { result } = renderHook(
    () => useRapidStep({
      beforeNextStep: async () => {
        throw new Error('test error');
      },
      onNextStepError,
    }),
    { wrapper: Wrapper }
  );

  await act(async () => {
    await result.current.onSubmit(newValues);
  })

  expect(onNextStepError).toHaveBeenCalledTimes(1);
  expect(result.current.values).toMatchObject(initialValues);
})

test('throws error on missing context', async () => {
  const { result } = renderHook(useRapidStep);
  await act(async () => {
    await expect(result.current.onSubmit({})).rejects.toThrow(Error);
  })
})

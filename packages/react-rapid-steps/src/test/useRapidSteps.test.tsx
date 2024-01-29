import {act, renderHook, waitFor} from '@testing-library/react'
import {IRapidStepsInvalidator, useRapidSteps} from '..'

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const metadata = {
  version: "1.0.0",
};

const storageProvider = {
  save: jest.fn(),
  load: jest.fn(),
  clear: jest.fn(),
}

const invalidator: IRapidStepsInvalidator = {
  shouldInvalidate: jest.fn((formState) => {
    return formState.metadata?.version !== "1.0.0";
  }),
  handleInvalidatedForm(initialFormData, setFormData) {
    setFormData(initialFormData);
  },
};

test("initializes correctly", () => {
  const { result } = renderHook(() =>
    useRapidSteps({
      initialValues,
      storageProvider,
      metadata,
      formId: 'test-form',
    })
  );

  expect(result.current.values).toMatchObject(initialValues);
  expect(result.current.currentStep).toBe(0);
});

test("sets form data", () => {
  const { result } = renderHook(() =>
    useRapidSteps({
      initialValues,
      storageProvider,
      metadata,
      formId: 'test-form',
    })
  );

  act(() => {
    result.current.setFormData({
      values: { firstName: "updated" },
      currentStep: 1,
    });
  });

  expect(result.current.values).toMatchObject({ firstName: "updated" });
  expect(result.current.currentStep).toBe(1);
});

test("resets form data", () => {
  const { result } = renderHook(() =>
    useRapidSteps({
      initialValues,
      storageProvider,
      metadata,
      formId: 'test-form',
    })
  );

  act(() => {
    result.current.setFormData({
      values: { firstName: "updated" },
      currentStep: 1,
    });
  });

  expect(result.current.values).toMatchObject({ firstName: "updated" });

  act(() => {
    result.current.reset();
  });

  expect(result.current.values).toMatchObject(initialValues);
  expect(result.current.currentStep).toBe(0);
});

test("invalidates form data", async () => {

  act(() => {
    storageProvider.load.mockResolvedValue({
      values: { key: 'loaded' },
      currentStep: 1,
      version: '1.1.0',
    });
  });

  const { result } = renderHook(() =>
    useRapidSteps({
      initialValues,
      storageProvider,
      invalidator,
      metadata,
      formId: 'test-form',
    })
  );

  await waitFor(() => {
    expect(invalidator.shouldInvalidate).toHaveBeenCalled();
  });
  expect(result.current.values).toMatchObject(initialValues);
});

import Navigation from "../Navigation"
import Stepper from "../Stepper"
import FirstStepComponent from "./FirstStepComponent"
import SecondStepComponent from "./SecondStepComponent"
import LastStepComponent from "./LastStepComponent"
import { LocalStorageProvider, RapidStepsWrapper, RapidStepsProvider, useRapidSteps } from "react-rapid-steps"

const initialValues = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
}

const storageProvider = new LocalStorageProvider('demo-example')

const HookFormExample = () => {
  const rapidStepsMethods = useRapidSteps({
    initialValues,
    storageProvider,
    formId: 'demo-example',
  });

  return (
    <RapidStepsProvider
      {...rapidStepsMethods}
    >
      <div
        className='flex flex-col items-center justify-center mt-10'
      >
        <Stepper
          titles={[
            'First Step',
            'Second Step',
            'Last Step',
          ]}
          className='mb-6'
        />
        <RapidStepsWrapper>
          <FirstStepComponent />
          <SecondStepComponent />
          <LastStepComponent />
        </RapidStepsWrapper>
        <Navigation className='mt-6' />
      </div>
    </RapidStepsProvider>
  )
}

export default HookFormExample

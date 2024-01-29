import Navigation from "./Navigation"
import { LocalStorageProvider, RapidStepsWrapper, RapidStepsProvider, useRapidSteps } from "react-rapid-steps"

const initialValues = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
}

const storageProvider = new LocalStorageProvider('nav-example')

const NavigationExample = () => {
  const rapidStepsMethods = useRapidSteps({
    initialValues,
    storageProvider,
    formId: 'nav-example',
  });

  return (
    <RapidStepsProvider
      {...rapidStepsMethods}
    >
      <div
        className='flex flex-col items-center justify-center'
      >
        <RapidStepsWrapper>
          <></>
          <></>
        </RapidStepsWrapper>
        <Navigation />
      </div>
    </RapidStepsProvider>
  )
}

export default NavigationExample

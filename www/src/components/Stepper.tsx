import { FC } from 'react'
import classNames from 'classnames'
import { useStepper } from 'react-rapid-steps'

interface IStepperProps {
  titles: string[]
  className?: string
}

const Stepper: FC<IStepperProps> = ({ titles, className }) => {
  const { currentStep } = useStepper()

  return (
    <div
      className={classNames(
        "flex items-start pt-1",
        className
      )}
    >
      {titles.map((title, index) => (
        <div
          className="flex flex-col items-center w-12 lg:w-36"
          key={"step-indicator-" + title}
        >
          <div
            className="relative"
          >
            <div
              className={classNames(
                "bg-fuchsia-600 rounded-full relative w-2 h-2 lg:w-2.5 lg:h-2.5 duration-200 z-10",
                index <= currentStep ? "bg-fuchsia-600 scale-150" : "bg-neutral-300 dark:bg-neutral-600"
              )}
            />
            {index !== titles.length - 1 && (
              <>
                <div
                  className={classNames(
                    "absolute w-12 lg:w-36 h-px left-full top-1/2 -translate-y-1/2 duration-200 bg-neutral-300 dark:bg-neutral-700"
                  )}
                />
                <div
                  className={classNames(
                    "absolute bg-fuchsia-400 h-px left-full top-1/2 -translate-y-1/2 duration-200",
                    index < currentStep ? "w-12 lg:w-36 scale-y-150" : "w-0"
                  )}
                />
              </>
            )}
          </div>
          <p
            className={classNames(
              "text-center text-sm mt-2 duration-200",
              index === currentStep && "font-semibold",
              index !== currentStep && "hidden lg:block"
            )}
          >
            {String(title)}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Stepper

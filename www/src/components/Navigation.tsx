import classNames from "classnames"
import { FC } from "react"
import { useNavigation } from "react-rapid-steps"

interface INavigationProps {
  className?: string
}

const Navigation: FC<INavigationProps> = ({ className }) => {
  const {
    reset,
    goToPreviousStep,
    isNextStepDisabled,
    isPreviousStepDisabled,
    isNextStepLoading,
    formId
  } = useNavigation()

  return (
    <div className={classNames('relative flex items-center', className)}>
      <button
        className={classNames(
          'absolute text-neutral-400 hover:opacity-75 active:opacity-50 duration-150 text-sm mr-4',
          'top-full mt-3 left-1/2 -translate-x-1/2'
        )}
        type="button"
        onClick={reset}
      >
        Reset
      </button>
      <button
        className='bg-fuchsia-200 text-neutral-800 rounded-xl px-6 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed hover:opacity-75 active:opacity-50 duration-150'
        onClick={goToPreviousStep}
        type="button"
        disabled={isPreviousStepDisabled}
      >
        Previous
      </button>
      <button
        className='!bg-fuchsia-700 text-white rounded-xl px-6 py-1.5 ml-2 hover:opacity-75 active:opacity-50 duration-150'
        type="submit"
        form={formId}
        disabled={isNextStepDisabled || isNextStepLoading}
      >
        Next{isNextStepLoading && '...'}
      </button>
    </div>
  )
}

export default Navigation

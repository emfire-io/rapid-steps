import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Input from "../Input"
import { useForm } from "react-hook-form"
import { useRapidStep } from "react-rapid-steps"

const SecondStepComponent = () => {
  const {
    values,
    onSubmit,
    formId
  } = useRapidStep();
  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(z.object({
      address1: z.string().min(2).max(30),
      address2: z.string().min(2).max(30),
    })),
    values: {
      address1: values?.address1,
      address2: values?.address2,
    }
  });

  return (
    <form
      className='px-6 pb-6 pt-5 flex flex-col items-center border rounded-3xl w-72'
      onSubmit={handleSubmit(onSubmit)}
      id={formId}
    >
      <h2
        className='text-xl font-semibold'
      >
        Your address
      </h2>
      <Input
        className='mt-3 w-full'
        label="Address Line 1"
        required
        error={
          typeof formState.errors.address1?.message === 'string' ? formState.errors.address1.message : undefined
        }
        {...register('address1')}
      />
      <Input
        className='mt-2 w-full'
        label="Address Line 2"
        required
        error={
          typeof formState.errors.address2?.message === 'string' ? formState.errors.address2.message : undefined
        }
        {...register('address2')}
      />
    </form>
  )
}

export default SecondStepComponent;

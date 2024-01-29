import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Input from "../Input"
import { useRapidStep } from "react-rapid-steps"

const FirstStepComponent = () => {
  const {
    values,
    onSubmit,
    formId
  } = useRapidStep();
  const {
    register,
    formState,
    handleSubmit
  } = useForm({
    resolver: zodResolver(z.object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
    })),
    values: {
      firstName: values?.firstName,
      lastName: values?.lastName,
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
        Your details
      </h2>
      <Input
        className='mt-3 w-full'
        label="First name"
        required
        error={
          typeof formState.errors.firstName?.message === 'string' ? formState.errors.firstName.message : undefined
        }
        {...register('firstName')}
      />
      <Input
        className='mt-2 w-full'
        label="Last name"
        required
        error={
          typeof formState.errors.lastName?.message === 'string' ? formState.errors.lastName.message : undefined
        }
        {...register('lastName')}
      />
    </form>
  )
}

export default FirstStepComponent;

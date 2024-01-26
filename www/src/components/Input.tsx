import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((inputProps, ref) => {
  const { label, error, className, required, ...props } = inputProps;
  return (
    <div className={classNames(
      className,
      'flex flex-col'
    )}>
      {label && (
        <label className='text-sm text-neutral-500'>
          {label}{required && <span className='text-fuchsia-600'>*</span>}
        </label>
      )}
      <input
        className='rounded-xl px-4 py-1.5 border bg-white'
        required={required}
        {...props}
        ref={ref}
      />
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  )
})

export default Input;

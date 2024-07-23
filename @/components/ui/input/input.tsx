import * as React from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Control error validation
  error?: boolean;
}

const constantStyles =
  'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
const errorStyles =
  'border-destructive focus-visible:ring-destructive pr-[calc(1.5em+0.75rem)] bg-no-repeat bg-[right_calc(0.375em+0.1875rem)_center] bg-[length:calc(0.75em+0.375rem)_calc(0.75em+0.375rem)] bg-[url("/content/images/circle-alert.svg")]';

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error = false, ...props }, ref) => {
  return (
    <input
      type={type}
      className={clsx(constantStyles, error ? errorStyles : 'border-input focus-visible:ring-ring', className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };

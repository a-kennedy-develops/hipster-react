import * as React from 'react';
import clsx from 'clsx';
import { Button } from './button';
import { CircleAlert, EyeIcon, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Control error validation
  error?: boolean;
}

const commonInput =
  'flex items-center h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
const errorInput = 'border-destructive focus-within:ring-destructive';

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error = false, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={clsx(commonInput, error ? errorInput : 'border-input focus-within:ring-ring', className)}>
      <input
        type={showPassword && type === 'password' ? 'text' : type}
        className="w-full bg-background focus:ring-none focus:outline-none"
        ref={node => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          inputRef.current = node;
        }}
        {...props}
      />
      {error && (
        <div className="flex items-center mr-2">
          <CircleAlert className="text-destructive" />
        </div>
      )}
      {type === 'password' && (
        <Button
          variant="icon"
          type="button"
          size="icon"
          onClick={togglePasswordVisibility}
          className={clsx('flex items-center', error && 'text-destructive')}
        >
          {showPassword ? <EyeOff /> : <EyeIcon />}
        </Button>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };

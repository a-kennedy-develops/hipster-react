import * as React from 'react';

import { cn } from '@/lib/utils';
import { CircleAlert } from 'lucide-react';
import './input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Control error validation
  error?: boolean;
}

<CircleAlert className="text-destructive" />;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error = false, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-destructive focus-visible:ring-destructive input-error-alert' : 'border-input focus-visible:ring-ring',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };

import { cn } from '../../utils/cn';

export const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

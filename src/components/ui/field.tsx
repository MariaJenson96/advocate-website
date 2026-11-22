import type { ComponentProps, ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

const controlBase = [
  'w-full rounded-card border border-white/15 bg-white/[0.03] px-4 text-[0.95rem] text-white',
  'transition-colors duration-300 ease-luxe hover:border-white/30',
  'focus:border-gold focus:bg-gold/[0.04] focus:outline-none focus-visible:outline-none',
  'aria-[invalid=true]:border-gold aria-[invalid=true]:bg-gold/[0.05]',
].join(' ')

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(controlBase, 'h-13', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(controlBase, 'min-h-36 resize-y py-3.5 leading-relaxed', className)} {...props} />
}

export { controlBase }

interface FieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: ReactNode
  className?: string
  children: ReactNode
  as?: 'div' | 'fieldset'
}

/** Label + control + accessible error message */
export function Field({ id, label, required, error, hint, className, children, as = 'div' }: FieldProps) {
  const Wrapper = as
  const LabelTag = as === 'fieldset' ? 'legend' : 'label'
  return (
    <Wrapper className={cn('flex min-w-0 flex-col gap-2.5', className)}>
      <LabelTag {...(as === 'div' ? { htmlFor: id } : {})} className="eyebrow text-[0.66rem] text-white/70">
        {label}
        {required && (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        )}
      </LabelTag>
      {children}
      {hint && !error && <p className="text-xs text-white/45">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-2 text-[0.8rem] text-gold">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </Wrapper>
  )
}

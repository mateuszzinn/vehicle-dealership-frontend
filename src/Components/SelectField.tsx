import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'

interface Option {
  label: string
  value: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  error?: string
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, className = '', ...props }, ref) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        ref={ref}
        className={`rounded-md border border-slate-300 px-3 py-2 outline-none ring-sky-500 transition focus:ring-2 ${className}`}
        {...props}
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  ),
)

SelectField.displayName = 'SelectField'

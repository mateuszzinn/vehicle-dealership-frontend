import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
}

const variants = {
  primary: 'bg-sky-600 text-white hover:bg-sky-700',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

export const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => (
  <button
    className={`rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
)

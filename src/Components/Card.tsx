import type { ReactNode } from 'react'

interface CardProps {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}

export const Card = ({ title, description, actions, children }: CardProps) => (
  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <header className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      </div>
      {actions}
    </header>
    {children}
  </section>
)

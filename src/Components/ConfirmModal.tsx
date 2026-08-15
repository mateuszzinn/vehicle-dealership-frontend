import type { ReactNode } from 'react'
import { Button } from './Button'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
  confirmLabel?: string
  children?: ReactNode
}

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
  confirmLabel = 'Confirmar',
  children,
}: ConfirmModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        {children}
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

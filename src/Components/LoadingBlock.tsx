export const LoadingBlock = ({ label = 'Carregando...' }: { label?: string }) => (
  <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">{label}</div>
)

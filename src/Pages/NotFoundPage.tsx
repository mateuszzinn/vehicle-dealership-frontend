import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
    <h1 className="text-2xl font-bold text-slate-900">Pagina nao encontrada</h1>
    <p className="mt-2 text-sm text-slate-500">A rota acessada nao existe.</p>
    <Link className="mt-4 inline-block text-sm font-medium text-sky-700" to="/dashboard">
      Voltar ao Dashboard
    </Link>
  </div>
)

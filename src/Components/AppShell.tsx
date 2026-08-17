import { Link, Outlet } from 'react-router-dom'

const navLinkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900'

export const AppShell = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm text-slate-500">Gestao Comercial</p>
            <h1 className="text-lg font-semibold text-slate-900">Vehicle Dealership</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 px-4 py-5 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-3">
          <nav className="flex flex-col gap-2">
            <Link className={navLinkClass} to="/">
              Dashboard
            </Link>
            <Link className={navLinkClass} to="/vehicles">
              Veiculos
            </Link>
            <Link className={navLinkClass} to="/dealers">
              Concessionarias
            </Link>
          </nav>
        </aside>

        <main className="space-y-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

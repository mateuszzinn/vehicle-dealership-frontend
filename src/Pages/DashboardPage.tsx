import { Link } from 'react-router-dom'
import { Card } from '../Components/Card'

export const DashboardPage = () => (
  <>
    <Card title="Visao Geral" description="Acesse os modulos principais do sistema.">
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-slate-800 transition hover:border-sky-300 hover:bg-sky-50"
          to="/vehicles"
        >
          <p className="font-semibold">Veiculos</p>
          <p className="text-sm text-slate-500">Cadastre, edite e associe veiculos.</p>
        </Link>

        <Link
          className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-slate-800 transition hover:border-sky-300 hover:bg-sky-50"
          to="/dealers"
        >
          <p className="font-semibold">Concessionarias</p>
          <p className="text-sm text-slate-500">Cadastre e consulte concessionarias parceiras.</p>
        </Link>
      </div>
    </Card>
  </>
)

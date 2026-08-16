import { Link } from 'react-router-dom'
import { Card } from '../Components/Card'

export const DashboardPage = () => (
  <>
    <Card title="Visao Geral" description="Acesse os modulos principais do sistema.">
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          className="rounded-lg border border-sky-200 bg-gradient-to-br from-sky-500 to-blue-600 p-4 text-left text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500 hover:shadow-lg"
          to="/vehicles"
        >
          <p className="font-semibold">Veiculos</p>
          <p className="text-sm text-sky-50/90">Cadastre, edite e associe veiculos.</p>
        </Link>

        <Link
          className="rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-500 to-teal-600 p-4 text-left text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-teal-500 hover:shadow-lg"
          to="/dealers"
        >
          <p className="font-semibold">Concessionarias</p>
          <p className="text-sm text-cyan-50/90">Cadastre e consulte concessionarias parceiras.</p>
        </Link>
      </div>
    </Card>
  </>
)

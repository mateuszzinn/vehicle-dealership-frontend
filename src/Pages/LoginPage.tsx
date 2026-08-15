import { InputField } from '../Components/InputField'
import { Button } from '../Components/Button'
import { useLoginPage } from '../Hooks/useLoginPage'

export const LoginPage = () => {
  const { form, onSubmit, isSubmitting, handlePhoneChange } = useLoginPage()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-amber-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm text-slate-500">Login local sem seguranca</p>
          <h1 className="text-2xl font-bold text-slate-900">Identificacao do usuario</h1>
        </div>

        <InputField label="Nome" placeholder="Seu nome" error={errors.name?.message} {...register('name')} />

        <InputField
          label="Email"
          type="email"
          placeholder="seu@email.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <InputField
          label="Telefone"
          placeholder="(00) 00000-0000"
          error={errors.phone?.message}
          {...register('phone')}
          onChange={(event) => handlePhoneChange(event.target.value)}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}

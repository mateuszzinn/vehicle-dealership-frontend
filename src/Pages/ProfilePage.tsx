import { InputField } from '../Components/InputField'
import { Button } from '../Components/Button'
import { Card } from '../Components/Card'
import { useProfilePage } from '../Hooks/useProfilePage'

export const ProfilePage = () => {
  const { form, onSubmit, handlePhoneChange } = useProfilePage()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card title="Perfil do Usuario" description="Dados locais do usuario logado.">
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <InputField label="Nome" error={errors.name?.message} {...register('name')} />
        <InputField label="Email" error={errors.email?.message} {...register('email')} />
        <InputField
          label="Telefone"
          error={errors.phone?.message}
          {...register('phone')}
          onChange={(event) => handlePhoneChange(event.target.value)}
        />
        <div className="sm:col-span-2">
          <Button type="submit">Salvar perfil</Button>
        </div>
      </form>
    </Card>
  )
}

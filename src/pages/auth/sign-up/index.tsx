import { useFormState } from "@/hooks/use-form-state";
import { Input } from "@/components/input";
import { Link } from "react-router-dom";
import { handleSignUp } from "./actions";
import { Loader2 } from "lucide-react";
import { useCreateAccount } from "@/http/create-account";

export function SignUp() {

  const { mutateAsync: createAccount } = useCreateAccount()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    (data) => handleSignUp(data, createAccount)
  )

  return (
    <div
      className="flex flex-col items-center space-y-4 relative"
    >

      <div
        className="space-y-4 flex flex-col items-center"
      >
        <h1 className="text-lg font-bold">Crie sua conta</h1>

        <p
          className="text-sm font-normal text-zinc-500"
        >
          Entre e aproveite as vantagens do <strong>upload.video</strong>
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-bold"
          >
            Seu nome
          </label>

          <Input
            type="text"
            id="name"
            name="name"
            className="min-w-79.5"
          />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-bold"
          >
            Seu e-mail
          </label>

          <Input
            type="email"
            id="email"
            name="email"
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="off"
            className="min-w-79.5"
          />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 bg-emerald-950 rounded-md font-bold text-sm"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin text-center" />
          ) : (
            'Finalizar cadastro'
          )}
        </button>
      </form>

      {success === false && message && (
        <p className="text-sm text-red-500">{message}</p>
      )}

      <div
        className="text-center text-sm font-semibold"
      >
        Ao continuar, você concorda com nossos {' '}
        <a className="underline" href="">Termos <br /> de serviço</a> e {' '}
        <a className="underline" href="">Políticas de privacidade</a>.
      </div>

      <Link
        to="/sign-in"
        className="text-sm underline mt-4"
      >
        Entrar
      </Link>

    </div>
  )
}

import { useFormState } from "@/hooks/use-form-state";
import { Input } from "@/components/input";
import { Link, useSearchParams } from "react-router-dom";
import { handleAuthenticate } from "./actions";
import { Loader2 } from "lucide-react";
import { useSignIn } from "@/http/sign-in";

export function SignIn() {

  const [searchParams] = useSearchParams()

  const { mutateAsync: authenticate } = useSignIn()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    (data) => handleAuthenticate(data, authenticate),
  )

  return (
    <div
      className="flex flex-col items-center space-y-4 relative"
    >

      <div
        className="space-y-4 flex flex-col items-center"
      >
        <h1 className="text-lg font-bold">Acessar plataforma</h1>

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
            defaultValue={searchParams.get('email') ?? ''}
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
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      {success === false && message && (
        <p>{message}</p>
      )}

      <Link
        to="/sign-up"
        className="text-sm underline mt-4"
      >
        Criar nova conta
      </Link>


    </div>
  )
}

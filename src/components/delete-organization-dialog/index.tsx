import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "../input";
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { useShutdownOrganization } from "@/http/shutdown-organization";
import { handleShutdownOrganization } from "./actions";
import { useFormState } from "@/hooks/use-form-state";

type DeleteOrganizationDialogProps = {
  slug: string
}

export function DeleteOrganizationDialog({ slug }: DeleteOrganizationDialogProps) {

  const [verify, setVerify] = useState('')

  const isDisabled = verify.toLowerCase() !== 'deletar minha organização'

  const { mutateAsync: shutdownOrganization } = useShutdownOrganization()

  const [_, handleSubmit, isPending] = useFormState(
    (data) => handleShutdownOrganization(data, shutdownOrganization)
  )

  return (
    <DialogContent
      className="bg-zinc-900 text-accent border-zinc-700 p-0"
    >
      <DialogHeader>
        <div className="bg-zinc-950 px-4 py-6 rounded-t-md border-b border-zinc-700 space-y-4">
          <DialogTitle>Deletar Organização</DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            Iremos deletar <strong>todas as informações da sua organização</strong>, incluindo seus uploads, coleções e membros. <br />
            Recomendamos que transfira as informações para outro usuário caso não queira perder esses dados.
          </DialogDescription>

          <div
            className="bg-red-700/50 text-red-400 w-full text-sm px-4 py-2 rounded"
          >
            Esta ação é irreversível. Pedimos que tenha certeza.
          </div>
        </div>
      </DialogHeader>

      <form className="flex flex-col px-4 pb-6 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="verify"
            className="text-sm font-semibold mb-1"
          >
            Para confirmar, digite <strong>deletar minha organização</strong> abaixo:
          </label>

          <Input
            type="text"
            id="verify"
            name="verify"
            className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
            value={verify}
            onChange={(event) => setVerify(event.target.value)}
          />
        </div>

        <input type="text" id="slug" name="slug" className="hidden" value={slug} />

        <div
          className="flex items-center justify-between"
        >
          <DialogClose
            className="p-2 border border-zinc-700 rounded-md text-sm font-semibold cursor-pointer"
          >
            Cancelar
          </DialogClose>

          <button
            type="submit"
            disabled={isDisabled || isPending}
            className="flex items-center px-4 py-2 bg-red-500 rounded-md gap-2 text-sm font-semibold cursor-pointer hover:bg-red-500/50 disabled:bg-red-700/50 disabled:cursor-not-allowed disabled:text-red-400"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <span>Continuar</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </DialogContent>
  )
}
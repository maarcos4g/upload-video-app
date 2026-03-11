import { Loader2, ArrowRight } from "lucide-react";
import { Input } from "../input";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { useCurrentOrganization } from "@/hooks/use-current-organization";
import { useTransferOrganization } from "@/http/transfer-organization";
import { useFormState } from "@/hooks/use-form-state";
import { handleTransferOrganization } from "./actions";

export function TransferOrganizationDialog() {

  const { slug } = useCurrentOrganization()

  const { mutateAsync: transferOrganization } = useTransferOrganization()

  const [{ errors }, handleSubmit, isPending] = useFormState(
    (data) => handleTransferOrganization(data, transferOrganization)
  )

  return (
    <DialogContent
      className="bg-zinc-900 text-accent border-zinc-700 p-0"
    >
      <DialogHeader>
        <div className="bg-zinc-950 px-4 py-6 rounded-t-md border-b border-zinc-700 space-y-4">
          <DialogTitle>Transferir Organização</DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            Transfira <strong>todas as informações da sua organização</strong> para outro usuário.
          </DialogDescription>
        </div>
      </DialogHeader>

      <form className="flex flex-col px-4 pb-6 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="verify"
            className="text-sm font-semibold mb-1"
          >
            Para confirmar, digite o e-mail do usuário que deseja transferir:
          </label>

          <Input
            type="email"
            id="transferToUserEmail"
            name="transferToUserEmail"
            className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
          />

          {errors?.transferToUserEmail && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400 mt-1">
              {errors.transferToUserEmail[0]}
            </p>
          )}
        </div>

        <input type="text" id="slug" name="slug" className="hidden" value={slug ?? ''} />

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
            disabled={isPending}
            className="flex items-center px-4 py-2 bg-zinc-100 rounded-md gap-2 text-sm text-zinc-950 font-semibold cursor-pointer hover:bg-zinc-100/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {false ? (
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
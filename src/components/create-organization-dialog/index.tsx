import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "../input";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { useFormState } from "@/hooks/use-form-state";
import { handleCreateOrganization } from "./actions";
import { createSlug } from "@/utils/create-slug";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateOrganization } from "@/http/create-organization";

interface CreateOrganizationDialogProps {
  onClose: () => void;
}

export function CreateOrganizationDialog({ onClose }: CreateOrganizationDialogProps) {
  const [nameValue, setNameValue] = useState('')

  const { mutateAsync: createOrganization } = useCreateOrganization()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    (data) => handleCreateOrganization(data, createOrganization),
    async () => {
      onClose();
    }
  )

  if (success === false && message) {
    toast.error(message)
  }

  useEffect(() => {
    if (success) {
      setNameValue('')
    }
  }, [success])

  return (
    <DialogContent
      className="bg-zinc-900 text-accent border-zinc-700 px-4 py-6"
    >
      <DialogHeader>
        <DialogTitle>Criar Organização</DialogTitle>
        <DialogDescription className="text-xs">Realize uploads e compartilhe com os membros do seu time.</DialogDescription>
      </DialogHeader>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div
          className="bg-zinc-900/80 p-2 rounded-md border border-zinc-800 shadow-lg shadow-zinc-900 space-y-3"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold"
            >
              Nome da Organização
            </label>

            <Input
              type="text"
              id="name"
              name="name"
              className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
              placeholder="Ex.: Acme Inc."
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />

            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="slug"
              className="text-sm font-semibold mb-1"
            >
              Slug
            </label>

            <Input
              type="text"
              id="slug"
              name="slug"
              className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm text-muted-foreground font-semibold cursor-not-allowed"
              readOnly
              value={createSlug(nameValue)}
            />

            <p className="text-xs text-muted-foreground">
              O slug é um identificador único da sua organização gerado automaticamente.
            </p>

            {errors?.slug && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.slug[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="domain"
              className="text-sm font-semibold mb-1"
            >
              Domínio
            </label>

            <Input
              type="text"
              id="domain"
              name="domain"
              className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
              placeholder="Ex.: google.team"
            />
            <p className="text-xs text-muted-foreground">
              O domínio garante que usuários usando o mesmo domínio sejam automaticamente inseridos na organização.
            </p>

            {errors?.domain && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.domain[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Switch name="shouldAttachUsersByDomain" id="shouldAttachUsersByDomain" className="" />

              <label
                htmlFor="shouldAttachUsersByDomain"
                className="text-sm font-semibold"
              >
                Autoinserir usuário por domínio
              </label>
            </div>

            <p className="text-xs text-muted-foreground">
              Quando habilitado, todos os usuários que criarem conta usando o e-mail que contém o domínio, será automaticamente inserido como membro da organização.
            </p>
          </div>
        </div>

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
            className="flex items-center px-4 py-2 bg-emerald-950 rounded-md gap-2 text-sm font-semibold cursor-pointer hover:bg-emerald-950/50"
            disabled={isPending === true}
          >
            {!isPending ? (
              <>
                <span>Continuar</span>
                <ArrowRight className="size-4" />
              </>
            ) : (
              <Loader2 className="size-4 animate-spin" />
            )}
          </button>
        </div>
      </form>
    </DialogContent>
  )
}
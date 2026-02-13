import { useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { Input } from "@/components/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DeleteOrganizationDialog } from "@/components/delete-organization-dialog";

import { Building, ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

import { useGetOrganization } from "@/http/get-organization";
import { useUploadAvatar } from "@/http/upload-avatar";
import { useGetMembership } from "@/http/get-membership";
import { useUpdateOrganization } from "@/http/update-organization";
import { useFormState } from "@/hooks/use-form-state";
import { handleUpdateOrganization } from "./actions";

export function GeneralTab() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading } = useGetOrganization({ slug: slug! })

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const { mutateAsync: uploadAvatar } = useUploadAvatar()

  const { mutateAsync: updateOrganization } = useUpdateOrganization()

  const [{ errors }, handleSubmit] = useFormState(
    (data) => handleUpdateOrganization(data, updateOrganization),
  )

  const { data: membershipData } = useGetMembership({ slug: slug! })

  const isAdmin = membershipData?.membership.role === 'admin'

  async function onUploadFile(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return;

    const previewUrl = URL.createObjectURL(file)
    setAvatarPreview(previewUrl)

    try {
      await uploadAvatar({
        file,
        organizationSlug: slug
      })
    } catch (error) {
      setAvatarPreview(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full bg-zinc-900" />
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col gap-6"
    >
      {/* Organization ID */}
      <div className="w-full flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-200 font-semibold">
            ID da Organização
          </span>

          <p className="text-xs text-zinc-500 font-normal">Esse é o identificador da sua organização no sistema upload.video</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono">
            {data?.organization.id}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(data?.organization.id ?? '')
              toast.success('ID da organização copiado para a área de transferência')
            }}
            className="flex items-center gap-1 text-xs text-zinc-50 cursor-pointer"
          >
            <ClipboardCopy className="size-3" />
            Copiar
          </button>
        </div>
      </div>

      {/* Display Name */}
      <div className="w-full flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-200 font-semibold">
            Nome de exibição
          </span>

          <p className="text-xs text-zinc-500 font-normal">Como o nome da sua organização é mostrado no upload.video</p>
        </div>

        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={data?.organization.name}
              className="ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
            />

            <input type="text" id="slug" name="slug" value={slug} className="hidden" />

            {errors?.name && (
              <p className="text-[10px] font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isAdmin}
            className="flex items-center text-xs text-zinc-100 cursor-pointer border border-zinc-800 px-2 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar
          </button>
        </form>
      </div>

      {/* Organization Domain */}
      <div className="w-full flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-200 font-semibold">
            Domínio da organização
          </span>

          <p className="text-xs text-zinc-500 font-normal">O domínio permite convidar automaticamente todos os novos <br />
            usuário que tenham o e-mail com esse domínio para a organização.</p>
        </div>

        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              id="domain"
              name="domain"
              defaultValue={data?.organization.domain}
              className="ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
            />

            <input type="text" id="slug" name="slug" value={slug} className="hidden" />

            {errors?.domain && (
              <p className="text-[10px] font-medium text-red-500 dark:text-red-400">
                {errors.domain[0]}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isAdmin}
            className="flex items-center text-xs text-zinc-100 cursor-pointer border border-zinc-800 px-2 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar
          </button>
        </form>
      </div>

      {/* Organization Slug */}
      <div className="w-full flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-200 font-semibold">
            Slug da Organização
          </span>

          <p className="text-xs text-zinc-500 font-normal">O slug é mostrado na URL quando um link público é compartilhado</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-zinc-800 focus-within:ring-2 focus-within:ring-emerald-950 focus-within:ring-offset-2 focus-within:ring-offset-black transition-all overflow-hidden">
            <div className="bg-zinc-900 px-3 py-2 border-r border-zinc-800 text-sm text-zinc-500 font-medium select-none">
              upload.video/
            </div>
            <input
              type="text"
              defaultValue={data?.organization.slug}
              className="bg-transparent border-none px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-none w-50"
            />
          </div>
        </div>
      </div>

      {/* Organization Avatar */}
      <div
        data-admin={isAdmin}
        className="group w-full flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-200 font-semibold">
            Logo da Organização
          </span>

          <p className="text-xs text-zinc-500 font-normal">Recomendado 400x400, PNG ou JPG</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center">
            <Avatar className="flex items-center justify-center size-14 rounded-full border border-zinc-800 bg-zinc-900 overflow-hidden group">
              <AvatarImage src={avatarPreview || data?.organization.avatarURL || ''} />
              <AvatarFallback className="bg-transparent text-zinc-600">
                <Building className="size-5" />
              </AvatarFallback>
            </Avatar>
          </div>

          <label htmlFor="avatar"
            className="cursor-pointer border border-zinc-800 px-3 py-2 rounded-md text-xs font-medium text-zinc-200 transition-colors group-data-[admin=false]:cursor-not-allowed group-data-[admin=false]:opacity-50 group-data-[admin=false]:pointer-events-none"
          >
            Selecionar imagem
          </label>

          <input type="file" name="avatar" id="avatar" className="hidden" accept="image/*" onChange={onUploadFile} disabled={!isAdmin} />
        </div>
      </div>

      {/* Transfer Organization */}
      <div className="w-full flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex flex-col gap-2">
          <span className="text-zinc-200 font-semibold">
            Transferir Organização
          </span>

          <p className="text-xs text-zinc-500 font-normal">
            Transfira todos os dados da organização para outro usuário.
          </p>
        </div>

        <button className="bg-zinc-50 px-3 py-2 rounded text-sm text-zinc-900 hover:bg-zinc-200 cursor-pointer transition-all">
          Transferir
        </button>
      </div>

      {/* Delete Organization */}
      <div
        data-admin={isAdmin}
        className="group"
      >
        <span
          className="text-[8px] font-bold text-red-500 uppercase tracking-widest bg-red-900/50 px-2 py-1 rounded-lg border border-red-500 group-data-[admin=false]:opacity-50 group-data-[admin=false]:border-zinc-800 group-data-[admin=false]:text-zinc-500 group-data-[admin=false]:bg-transparent"
        >
          Zona de Perigo
        </span>

        <div className="w-full flex items-center justify-between py-4">
          <div className="flex flex-col gap-2">
            <span className="text-zinc-200 font-semibold group-data-[admin=false]:text-zinc-700">
              Deletar Organização
            </span>

            <p className="text-xs text-zinc-500 font-normal group-data-[admin=false]:text-zinc-700">
              Todos os dados da organização serão permanentemente deletados <br /> (essa ação é irreversível)
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button
                disabled={!isAdmin}
                className="bg-red-500 px-3 py-2 rounded text-sm text-zinc-50 hover:bg-red-600 cursor-pointer transition-all disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
              >
                Deletar organização
              </button>
            </DialogTrigger>
            <DeleteOrganizationDialog slug={slug!} />
          </Dialog>

        </div>
      </div>
    </div>
  )
}
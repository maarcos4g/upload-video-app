import { Input } from "@/components/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormState } from "@/hooks/use-form-state";
import { useProfile } from "@/http/profile";
import { useUpdateProfile } from "@/http/update-profile";
import { useUploadAvatar } from "@/http/upload-avatar";
import dayjs from "dayjs";
import { Image, Loader2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { handleUpdateProfile } from "./actions";

export function GeneralTab() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const { data, isLoading } = useProfile()
  const { mutateAsync: uploadAvatar } = useUploadAvatar()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full bg-zinc-900" />
        ))}
      </div>
    )
  }

  async function onUploadFile(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return;

    const previewUrl = URL.createObjectURL(file)
    setAvatarPreview(previewUrl)

    try {
      await uploadAvatar({
        file,
        userId: data?.id
      })
    } catch (error) {
      setAvatarPreview(null)
    }
  }

  const { mutateAsync: updateProfile } = useUpdateProfile()

  const [{ errors }, handleSubmit, isPending] = useFormState(
    (data) => handleUpdateProfile(data, updateProfile),
  )

  return (
    <div
      className="w-full flex flex-col gap-6"
    >
      <div className="text-lg font-semibold pb-2 border-b border-zinc-800">Informações da conta</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-zinc-200 font-semibold text-sm" htmlFor="name">Nome</label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={data?.name}
              className="ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
            />

            {errors?.name && (
              <p className="text-[10px] font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-zinc-200 font-semibold text-sm" htmlFor="email">E-mail</label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={data?.email}
              className="ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
            />

            {errors?.email && (
              <p className="text-[10px] font-medium text-red-500 dark:text-red-400">
                {errors.email[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-zinc-200 font-semibold text-sm" htmlFor="avatarURL">Foto de perfil</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <Avatar className="flex items-center justify-center size-14 rounded-full border border-zinc-800 bg-zinc-900 overflow-hidden group">
                  <AvatarImage src={avatarPreview || data?.avatarURL || ''} />
                  <AvatarFallback className="bg-transparent text-zinc-600">
                    <Image className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </div>

              <label htmlFor="avatar"
                className="cursor-pointer border border-zinc-800 px-3 py-2 rounded-md text-xs font-medium text-zinc-200 transition-colors group-data-[admin=false]:cursor-not-allowed group-data-[admin=false]:opacity-50 group-data-[admin=false]:pointer-events-none"
              >
                Selecionar imagem
              </label>

              <input type="file" name="avatar" id="avatar" className="hidden" accept="image/*" onChange={onUploadFile} />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full text-sm text-zinc-500">
            <label className="text-zinc-200 font-semibold text-sm">Sessão atual</label>
            Esta sessão irá expirar {dayjs(data?.sessionExpiresAt).from(new Date())} | {dayjs(data?.sessionExpiresAt).format('DD/MM - HH:mm')}h
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button
            disabled={isPending}
            className="bg-zinc-200 text-zinc-950 text-sm font-semibold px-4 py-2 rounded hover:bg-zinc-200/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!isPending ? (
              <>
                Atualizar perfil
              </>
            ) : (
              <Loader2 className="size-4 animate-spin" />
            )}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        <div className="text-lg font-semibold border-b border-zinc-800 pb-2">Zona de perigo</div>

        <button disabled className="bg-transparent border border-red-500/50 px-4 py-2 rounded text-sm font-semibold cursor-pointer hover:bg-red-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Deletar conta
        </button>
      </div>
    </div>
  )
}
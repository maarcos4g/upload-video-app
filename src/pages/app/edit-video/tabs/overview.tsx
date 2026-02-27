import { Input } from "@/components/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetUploadResponse } from "@/http/get-upload/types";
import { parseTranscription, type ParseTranscription } from "@/utils/parse-transcription";
import { ClipboardCopy, Loader2 } from "lucide-react";
import { toast } from "sonner";

type OvervireTabProps = GetUploadResponse & {
  generatingMetadata?: boolean
}

export function OverviewTab({ upload, generatingMetadata }: OvervireTabProps) {

  function handleCopyExternalID(externalId: string) {
    navigator.clipboard.writeText(externalId)
    toast.success('ID Externo copiado!')
  }

  const transcription: ParseTranscription[] | null = upload.transcription ? parseTranscription(upload.transcription) : null

  return (
    <div className="grid grid-cols-[1fr_488px] space-x-4">
      <div className="border border-zinc-800 px-6 py-4 rounded-md space-y-4">
        <div>
          <h2 className="text-lg font-bold">Editar vídeo</h2>
          <p className="text-sm font-normal text-zinc-500">Atualize as informações do vídeo</p>
        </div>


        <form className="space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-zinc-300 flex gap-1 items-center"
            >
              Título do vídeo <p className="text-xs text-zinc-500">(sincronizado com o bunny)</p>
            </label>

            <Input
              type="text"
              id="title"
              name="title"
              className="min-w-79.5"
              defaultValue={upload.title}
            />

            {/* <button
              // onClick={generateTitlesWithAI}
              className='bg-transparent border border-zinc-800 px-4 py-2 rounded cursor-pointer text-xs font-medium text-zinc-300 flex items-center justify-center gap-1.5 hover:bg-zinc-900 disabled:text-zinc-500 disabled:hover:bg-transparent disabled:cursor-not-allowed'
            // disabled={files.length <= 0}
            >
              <Sparkles className='size-4' />
              Gerar título curto com IA
            </button> */}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-300 flex items-center gap-1"
            >
              Descrição <p className="text-xs text-zinc-500">(sincronizado com o bunny)</p>
            </label>

            {!generatingMetadata ? (
              <textarea
                name="description"
                id="description"
                className="h-40 resize-none overflow-y-auto no-scrollbar rounded-md border border-zinc-700 bg-transparent px-3 py-2 ring-offset-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-xs"
                defaultValue={upload.description ?? ''}
              />
            ) : (
              <div className="relative">
                <Skeleton className="w-full h-40 relative" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin size-4" />
                  <span className="text-xs text-zinc-400">
                    Descrição sendo gerada...
                  </span>
                </div>
              </div>
            )}

            {/* <button
              // onClick={generateTitlesWithAI}
              className='bg-transparent border border-zinc-800 px-4 py-2 rounded cursor-pointer text-xs font-medium text-zinc-300 flex items-center justify-center gap-1.5 hover:bg-zinc-900 disabled:text-zinc-500 disabled:hover:bg-transparent disabled:cursor-not-allowed'
            // disabled={files.length <= 0}
            >
              <Sparkles className='size-4' />
              Gerar descrição com IA
            </button> */}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="externalId"
              className="text-sm font-medium text-zinc-300 flex gap-1 items-center"
            >
              Status/ID Externo
            </label>

            <div className="w-full flex gap-4 rounded-md border border-zinc-700 bg-transparent px-3 py-2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-zinc-200">
                  <div className="bg-zinc-900 text-zinc-200 text-xs px-2.5 py-1 rounded">{upload.status}</div>
                  {upload.externalId}
                </div>
                <button
                  onClick={() => handleCopyExternalID(upload.externalId ?? '')}
                  className="flex gap-2 text-xs text-zinc-400 items-center justify-center border border-zinc-800 px-2 py-1 rounded hover:opacity-50 cursor-pointer"
                >
                  <ClipboardCopy className="size-4" />
                  Copiar ID Externo
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-zinc-100 px-10 py-2 rounded text-sm text-zinc-900 font-semibold"
          >
            Salvar
          </button>
        </form>
      </div>

      <div
        className="border border-zinc-800 rounded-md h-full flex flex-col bg-zinc-950"
      >
        {upload.streamURL ? (
          <div className="w-full relative aspect-video">
            <iframe
              src={upload.streamURL}
              loading="lazy"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-none"
            />
            {/* <source src={`https://vz-3b85ab2e-d35.b-cdn.net/f182abda-6dbb-46a6-8f02-38cbfaf0bd99/playlist.m3u8`} /> */}
          </div>
        ) : (
          <div className="w-full relative aspect-video">
            <Skeleton className="w-full h-full relative" />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center justify-center gap-1">
              <Loader2 className="animate-spin size-4" />
              <p className="text-xs text-zinc-300">O preview do vídeo está sendo gerado...</p>
              <p className="text-[10px] text-zinc-400">A página será recarregada automaticamente</p>
            </div>
          </div>
        )}

        {upload.transcription ? (
          <div className="px-4 py-4 flex-1 max-h-67.5 space-y-1 overflow-y-auto overflow-hidden no-scrollbar text-sm text-zinc-200 leading-relaxed">
            {transcription?.map((item, index) => (
              <div key={index} className="flex items-start gap-2">

                <div className="flex items-center justify-center text-[10px] text-zinc-300 bg-transparent px-1 py-0.5 border border-zinc-600 rounded">
                  {item.startTime}
                </div>

                <p className="text-sm text-zinc-100 leading-relaxed group-hover:text-zinc-50 transition-colors">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-4 flex-1 max-h-67.5 no-scrollbar relative">
            <div className="space-y-1 relative">
              {Array.from({ length: 12 }).map(() => <Skeleton className="w-full h-4" />)}
            </div>
            <div className="bg-zinc-900/70 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex flex-col items-center justify-center gap-1">
              <Loader2 className="animate-spin size-4" />
              <p className="text-xs text-zinc-300">A transcrição está sendo gerada...</p>
              <p className="text-[10px] text-zinc-400">A página será recarregada automaticamente após o fim</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
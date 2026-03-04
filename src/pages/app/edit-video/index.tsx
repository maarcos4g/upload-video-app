import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUpload } from "@/http/get-upload";
import { useGetUploadActions } from "@/http/get-upload-actions";
import { Music2, Youtube } from "lucide-react";
import { useParams } from "react-router-dom";
import { ActionsTab } from "./tabs/actions.tsx";
import { OverviewTab } from "./tabs/overview";
import { Skeleton } from "@/components/ui/skeleton";

export function EditVideo() {
  const { slug, videoId } = useParams<{ slug: string, videoId: string }>()

  if (!videoId) {
    return;
  }

  const { data } = useGetUpload({
    slug: slug!,
    uploadId: videoId
  })

  const { data: uploadActions } = useGetUploadActions({
    slug: slug!,
    uploadId: videoId
  })

  const tabs = [{ value: 'overview', label: 'Visão Geral' }, { value: 'actions', label: 'Ações' }]

  const isAudioProcessing = uploadActions?.actions.some(
    action => action.type === 'upload_audio_to_external_provider' && action.status !== 'success'
  )

  const isVideoProcessing = uploadActions?.actions.some(
    action => action.type === 'process_video' && action.status !== 'success'
  )

  const generatingMetadata = uploadActions?.actions.some(
    action => action.type === 'generate_ai_metadata' && action.status !== 'success'
  )

  const isDisabledAudioButton = isAudioProcessing || !data?.upload.audioURL
  const isDisabledVideoButton = isVideoProcessing || !data?.upload.streamURL

  return (
    <div
      className="flex flex-col flex-1 px-6 py-2 gap-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-50">Editar vídeo</h1>
        <div
          className="space-x-2 flex"
        >
          <a
            href={!isDisabledVideoButton ? data.upload.streamURL! : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={isDisabledVideoButton}
            data-disabled={isDisabledVideoButton}
            onClick={(e) => isDisabledVideoButton && e.preventDefault()}
            className="flex items-center gap-2 border border-zinc-700 px-4 py-2 rounded text-sm text-zinc-300 font-medium cursor-pointer hover:opacity-90 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed transition-all"
          >
            <Youtube className="size-4" />
            Download MP4
          </a>
          <a
            href={!isDisabledAudioButton ? data?.upload.audioURL! : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={isDisabledAudioButton}
            data-disabled={isDisabledAudioButton}
            onClick={(e) => isDisabledAudioButton && e.preventDefault()}
            className="flex items-center gap-2 border border-zinc-700 px-4 py-2 rounded text-sm text-zinc-300 font-medium cursor-pointer hover:opacity-90 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed transition-all">
            <Music2 className="size-4" />
            Download MP3
          </a>
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex flex-col bg-zinc-950 text-zinc-100 gap-2 w-full flex-1" >
        <TabsList className="bg-zinc-800 text-sm text-zinc-400 rounded-md gap-0.5">
          {tabs.map((item, index) => (
            <TabsTrigger
              key={index}
              value={item.value}
              className="w-full bg-transparent text-zinc-400 data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-100 hover:text-zinc-300 transition-colors rounded cursor-pointer"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          {!data?.upload ? <Skeleton className="w-full h-100" /> : <OverviewTab upload={data?.upload} generatingMetadata={generatingMetadata} />}
        </TabsContent>

        <TabsContent value="actions" className="flex flex-col gap-4">
          <div className="text-sm text-zinc-500">As ações são iniciadas e concluídas de forma assíncrona.</div>

          <ActionsTab actions={uploadActions?.actions || []} />
        </TabsContent>
      </Tabs>

    </div>

  )
}
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { env } from "@/env"
import { useUploadStore } from "@/store/use-upload-store"
import axios from "axios"
import dayjs from "dayjs"
import { Check, Copy, Video } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

export function BatchUpdates() {
  const { slug, batchId } = useParams<{ slug: string, batchId: string }>()
  const [progress, setProgress] = useState<number[]>([])

  const { currentBatch } = useUploadStore()

  const isCorrectBatch = currentBatch.batchId === batchId
  const files = isCorrectBatch ? currentBatch.files : []

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!isCorrectBatch) {
      return;
    }
  }, [batchId])

  async function handleSaveAll() {
    const promises = currentBatch.files.map(async (signedFile, index) => {
      const fileBinary = currentBatch.binaries[index].file

      try {
        await axios.put(
          signedFile.uploadURL,
          fileBinary,
          {
            headers: {
              'Content-Type': 'application/octet-stream',
              'AccessKey': env.VITE_BUNNY_API_KEY,
            },
            transformRequest: [(data) => data],
            onUploadProgress: (progressEvent) => {
              const current = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
              setProgress(prev => {
                const newState = [...prev]
                newState[index] = current
                return newState
              })
            },
          })
      } catch (error) {
        console.error(`Falha no upload: ${signedFile.title}`, error)
        toast.error(`Falha no upload do arquivo: ${signedFile.title}`)
      }
    })

    await Promise.all(promises)
    navigate({
      pathname: `/org/${slug}`
    })
  }

  return (
    <div
      className="w-full flex flex-col flex-1 px-6 py-4 gap-6"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-zinc-50 text-lg">Detalhes do lote</h1>

        <button
          onClick={handleSaveAll}
          className="bg-emerald-950 px-4 py-2 flex items-center gap-2 rounded text-sm font-semibold hover:bg-emerald-950/80 cursor-pointer disabled:bg-emerald-900/30 disabled:text-zinc-100/30"
          disabled={files.length <= 0}
        >
          <Check className="size-4" />
          Salvar lote
        </button>
      </div>

      <div className='border border-zinc-800 rounded-md py-1'>
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-normal text-sm"></TableHead>
              <TableHead className="text-zinc-400 font-normal text-sm">Vídeo</TableHead>
              <TableHead className="text-zinc-400 font-normal text-sm">Duração</TableHead>
              <TableHead className="text-zinc-400 font-normal text-sm">Tamanho</TableHead>
              <TableHead className="text-zinc-400 font-normal text-sm">ID Externo</TableHead>
              <TableHead className="text-zinc-400 font-normal text-sm flex items-center gap-2">
                <Video className="size-4" /> Upload
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => {
              const binary = currentBatch.binaries[index]
              const seconds = Math.floor(Number(binary.duration))

              return (
                <TableRow key={file.uploadId} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group">
                  <TableCell className="flex px-4 py-2 items-center justify-center">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex flex-col"
                    >
                      <span className="text-sm font-semibold text-zinc-300">{file.title}</span>
                      <span className='text-xs text-zinc-600 font-mono'>
                        {file.slug}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-zinc-300">
                      {dayjs().startOf('day').second(seconds).format(seconds >= 3600 ? 'HH:mm:ss' : 'mm:ss')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-zinc-300">
                      {(binary.file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className="h-full flex items-center gap-2"
                    >
                      <span className='text-sm text-zinc-300'>
                        {file.uploadId.substring(0, 20).concat('...')}
                      </span>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(file.uploadId)
                          toast.success('ID externo copiado para a área de transferência')
                        }}
                        className="flex items-center gap-1 bg-transparent border border-zinc-800 rounded px-1.5 py-0.5 text-zinc-500 text-xs cursor-pointer"
                      >
                        <Copy className="size-3" />
                        Copiar
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Progress className="w-30" value={progress[index] ?? 0} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
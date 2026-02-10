import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetCollections } from "@/http/get-collections"
import { flattenCollections } from "@/utils/flatten-collections"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

interface FilesInStorage {
  id: string
  name: string
  size: number
  type: string
  title: string
  previewURL: string
  duration: string
  collectionId: string | null
}

export function BatchUpdates() {
  const { slug } = useParams<{ slug: string }>()

  const [files, setFiles] = useState<FilesInStorage[]>(() => {
    const stored = localStorage.getItem('files')
    return stored ? JSON.parse(stored) : []
  })

  const { data } = useGetCollections({ slug: slug! })
  const flatCollections = flattenCollections(data?.collections ?? [])

  function handleSaveAll() {
    const hasIncompleteFiles = files.some(file => !file.collectionId)

    if (hasIncompleteFiles) {
      toast.error('Selecione uma coleção para todos os vídeos antes de salvar')
      return;
    }

    console.log('Salvando lote: ', files)
    localStorage.setItem('files', JSON.stringify(files))
    toast.success('Lote salvo com sucesso!')
  }

  function handleSelectCollection(index: number, collectionId: string) {
    setFiles(prev => {
      const newFiles = [...prev]
      newFiles[index] = { ...newFiles[index], collectionId }
      return newFiles
    })
  }

  return (
    <div
      className="w-full flex flex-col flex-1 px-6 py-4 gap-6"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-zinc-50 text-lg">Edição em lote</h1>

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
              <TableHead className="text-zinc-400 font-normal text-sm">Coleção</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group">
                <TableCell className="flex px-4 py-2 items-center justify-center">
                  <span className="text-sm font-bold">{index + 1}</span>
                </TableCell>
                <TableCell>
                  <div
                    className="flex flex-col"
                  >
                    <span className="text-sm font-semibold text-zinc-300">{file.title}</span>
                    <span className='text-xs text-zinc-600 font-mono'>
                      {file.name.length > 30
                        ? file.name.substring(0, 30).concat('...')
                        : file.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-300">{file.duration}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-300">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </TableCell>
                <TableCell>
                  <div
                    className="h-full flex items-center gap-2"
                  >
                    <span className='text-sm text-zinc-300'>
                      {file.id.substring(0, 20).concat('...')}
                    </span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(file.id)
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
                  <Select
                    value={file.collectionId ?? undefined}
                    onValueChange={(value) => handleSelectCollection(index, value)}
                  >
                    <SelectTrigger className="w-full border-zinc-700">
                      <SelectValue placeholder="Selecione a coleção" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-zinc-900 text-zinc-100 border-zinc-700"
                    >
                      <SelectGroup>
                        {flatCollections.map((collection) => (
                          <SelectItem
                            key={collection.id}
                            className="focus:bg-zinc-800 focus:text-zinc-100"
                            value={collection.id}>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{collection.name}</span>
                              {collection.parentName && (
                                <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">
                                  Dentro de: {collection.parentName}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
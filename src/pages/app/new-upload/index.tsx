import { FilesTable, type UploadFile } from '@/components/files-table'
import { useCurrentCollection } from '@/hooks/use-current-collection'
import { useCurrentOrganization } from '@/hooks/use-current-organization'
import { useCreateUploadBatch } from '@/http/create-upload-batch'
import { useUploadStore } from '@/store/use-upload-store'
import { formatStorageSize } from '@/utils/format-storage-size'
import { getVideoMetadata } from '@/utils/get-video-metadata'
import { Loader2, Upload, Wand2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function NewUpload() {
  const navigate = useNavigate()
  const { slug } = useCurrentOrganization()
  const { get: currentCollectionId } = useCurrentCollection()

  const [files, setFiles] = useState<UploadFile[]>([])
  const [_, setLoadingFiles] = useState(false)
  const [filesProcessingProgress, setFilesProcessingProgress] = useState<Record<string, number>>({})

  const { mutateAsync: createUploadBatch, isPending } = useCreateUploadBatch()

  const { setBatch } = useUploadStore()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoadingFiles(true)

    for (const file of acceptedFiles) {
      setFilesProcessingProgress(prev => ({ ...prev, [file.name]: 0 }))

      try {
        const { preview, duration } = await getVideoMetadata(file)

        const processedFile: UploadFile = {
          file,
          preview,
          duration,
          title: file.name
        }

        setFiles((prev) => [...prev, processedFile])
        setFilesProcessingProgress(prev => ({ ...prev, [file.name]: 100 }))
      } catch (error) {
        console.error(`Erro ao processar ${file.name}`, error)
        toast.error(`Erro ao carregar metadados de ${file.name}`)
      }
    }
    setLoadingFiles(false)

    // const newFiles = await Promise.all(
    //   acceptedFiles.map(async (file) => {
    //     const { preview, duration } = await getVideoMetadata(file)
    //     return {
    //       file,
    //       preview,
    //       duration,
    //       title: file.name,
    //     }
    //   })
    // )
  }, [])

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    },
    maxFiles: 10
  })

  function handleClearFiles() {
    setFiles([])
  }

  function handleDeleteFile(indexToDelete: number) {
    setFiles((prev) => {
      const fileToRemove = prev[indexToDelete];

      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      return prev.filter((_, i) => i !== indexToDelete);
    });
  }

  function shortTitles() {
    setFiles((prev) => {
      return prev.map((item, index) => ({
        ...item,
        title: `Video ${index + 1}`
      }))
    })
  }

  async function handleCreateAll() {
    if (files.length === 0) {
      toast.error('Selecione os arquivos primeiro!')
    }

    try {
      const result = await createUploadBatch({
        collectionId: currentCollectionId() ?? 'null',
        slug: slug!,
        titles: files.map(f => f.title.split('.mp4')[0])
      })

      setBatch(result.batchId, result.files, files)

      toast.success('Lote criado com sucesso! Iniciando uploads...')
      navigate({
        pathname: `/org/${slug}/batch/${result.batchId}`
      })
    } catch (error) {
      toast.error('Erro ao criar lote de vídeos')
    }

  }

  const totalSizeBytes = files.reduce((acc, item) => acc + item.file.size, 0)

  return (
    <div
      className="w-full flex flex-col flex-1 px-6 py-4 gap-6"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-zinc-50 text-lg">Novo Upload</h1>

        <div className="flex gap-3 items-center bg-blend-exclusion">
          <button
            onClick={shortTitles}
            className='bg-transparent border border-zinc-800 px-4 py-2 rounded cursor-pointer text-xs font-medium text-zinc-300 flex items-center gap-1.5 hover:bg-zinc-900 disabled:text-zinc-500 disabled:hover:bg-transparent disabled:cursor-not-allowed'
            disabled={files.length <= 0}
          >
            <Wand2 className='size-4' />
            Encurtar títulos
          </button>
          <div className="w-px h-6 bg-zinc-600" />
          <span
            onClick={handleClearFiles}
            data-disabled={files.length > 0}
            className="text-zinc-700 text-sm font-semibold cursor-pointer hover:underline data-[disabled=true]:text-zinc-300 data-[disabled=false]:cursor-not-allowed"
          >
            Limpar fila
          </span>
          <button
            onClick={handleCreateAll}
            className="flex gap-2 bg-emerald-950 px-4 py-2 rounded text-sm font-semibold hover:bg-emerald-950/80 cursor-pointer disabled:bg-emerald-900/30 disabled:text-zinc-100/30"
            disabled={files.length <= 0 || isPending}
          >
            {!isPending ? (
              <>
                Criar todos ({files.length})
              </>
            ) : (
              <>
                <Loader2 className='animate-spin size-4' />
                <p>Criando...</p>
              </>
            )}
          </button>
        </div>
      </div>

      <div
        {...getRootProps()}
        className='border border-zinc-800 rounded-md bg-zinc-900 py-6 flex flex-col items-center gap-2 cursor-pointer'
      >
        <input {...getInputProps()} />
        <Upload
          className='size-4 text-zinc-500'
        />

        <p className='text-sm font-semibold text-zinc-500'>
          Solte os arquivos aqui
        </p>

        <p className='text-xs text-zinc-500 text-center'>
          Apenas arquivos MP4. <br /> Limite de 10 por vez.
        </p>
      </div>

      <FilesTable files={files} handleDeleteFile={handleDeleteFile} processingProgress={filesProcessingProgress} />

      {files.length > 0 && (
        <p className='flex text-sm text-zinc-600 font-semibold gap-1'>
          Essa ação irá consumir
          <p className='text-zinc-300'>{formatStorageSize(totalSizeBytes)}</p>
          do seu storage de uploads.
        </p>
      )}

    </div>
  )
}
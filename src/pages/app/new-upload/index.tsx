import { FilesTable, type UploadFile } from '@/components/files-table'
import { formatStorageSize } from '@/utils/format-storage-size'
import { getVideoMetadata } from '@/utils/get-video-metadata'
import { Upload, Wand2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export function NewUpload() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const [files, setFiles] = useState<UploadFile[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const { preview, duration } = await getVideoMetadata(file)
        return {
          file,
          preview,
          duration,
          title: file.name,
        }
      })
    )
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    }
  })

  function handleClearFiles() {
    console.log('Limpou')
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

  function generateTitlesWithAI() {
    setFiles((prev) => {
      return prev.map((item, index) => ({
        ...item,
        title: `Aula ${index + 1}`
      }))
    })
  }

  function handleCreateAll() {
    if (files.length === 0) {
      toast.error('Selecione os arquivos primeiro!')
    }

    const filesToUpload = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.file.name,
      size: file.file.size,
      type: file.file.type,
      title: file.title,
      previewURL: file.preview,
      duration: file.duration,
      collectionId: null
    }))

    localStorage.removeItem('files')
    localStorage.setItem('files', JSON.stringify(filesToUpload))

    navigate({
      pathname: `/${slug}/batch/${crypto.randomUUID()}`
    })
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
            onClick={generateTitlesWithAI}
            className='bg-transparent border border-zinc-800 px-4 py-2 rounded cursor-pointer text-xs font-medium text-zinc-300 flex items-center gap-1.5 hover:bg-zinc-900 disabled:text-zinc-500 disabled:hover:bg-transparent disabled:cursor-not-allowed'
            disabled={files.length <= 0}
          >
            <Wand2 className='size-4' />
            Gerar títulos com IA
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
            className="bg-emerald-950 px-4 py-2 rounded text-sm font-semibold hover:bg-emerald-950/80 cursor-pointer disabled:bg-emerald-900/30 disabled:text-zinc-100/30"
            disabled={files.length <= 0}
          >
            Criar todos ({files.length})
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

        <p className='text-xs text-zinc-500'>
          Aceito apenas arquivos MP4
        </p>
      </div>

      <FilesTable files={files} handleDeleteFile={handleDeleteFile} />

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
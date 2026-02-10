import { Trash } from "lucide-react";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { UploadStatus } from "./upload-status";
import { Progress } from "./ui/progress";

export interface UploadFile {
  file: File
  preview: string
  duration: string
  title: string
}

interface FilesTableProps {
  files: UploadFile[]
  handleDeleteFile(indexToDelete: number): void
}

export function FilesTable({ files, handleDeleteFile }: FilesTableProps) {
  return (
    <div className='border border-zinc-800 rounded-md py-1'>
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400 font-normal text-sm"></TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Informações</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Metadados</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Status</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Upload</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm"></TableHead>
          </TableRow>
        </TableHeader>
        {files.length > 0 ? (
          <TableBody>
            {files.map(({ file, preview: previewURL, duration, title }, index) => (
              <TableRow key={index} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group">
                <TableCell>
                  <img src={previewURL} className='w-28.5 h-16' />
                </TableCell>
                <TableCell>
                  <Input
                    value={title}
                    onChange={() => { }}
                  />
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='text-sm text-zinc-500'>
                      {file.name.length > 30
                        ? file.name.substring(0, 30).concat('...')
                        : file.name}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • {duration}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <UploadStatus status='ready' />
                </TableCell>
                <TableCell>
                  <Progress className="w-28" value={0} />
                </TableCell>
                <TableCell>
                  <div>
                    <button
                      onClick={() => handleDeleteFile(index)}
                      className='bg-red-500 px-4 py-1.5 flex items-center gap-2 rounded text-sm font-semibold cursor-pointer hover:bg-red-500/80'
                    >
                      <Trash className='size-4' />
                      Deletar
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableRow className='hover:bg-transparent border-none'>
            <TableCell colSpan={5}>
              <div
                className='w-full flex items-center justify-center py-10 text-sm text-zinc-300'
              >
                Nenhum vídeo selecionado.
              </div>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </div>
  )
}
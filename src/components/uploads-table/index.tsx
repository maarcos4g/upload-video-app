import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { UploadStatus } from "../upload-status"
import { Trash } from "lucide-react"

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import type { GetUploadResponse } from "@/http/get-uploads/types"
import { Link } from "react-router-dom"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type UploadsTableProps = GetUploadResponse & {
  slug: string
}

export function UploadsTable({ uploads, slug }: UploadsTableProps) {

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full flex flex-col flex-1">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400 font-medium">Vídeo</TableHead>
            <TableHead className="text-zinc-400 font-medium">Duração</TableHead>
            <TableHead className="text-zinc-400 font-medium">Tamanho</TableHead>
            <TableHead className="text-zinc-400 font-medium">Status</TableHead>
            <TableHead className="text-zinc-400 font-medium">Enviado há</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploads.map((upload) => (
            <TableRow key={upload.id} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group">
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span>
                  </span>
                  <Link to={`/org/${slug}/video/${upload.id}`} className="font-semibold text-zinc-100 leading-none hover:underline cursor-pointer">
                    {upload.title.length > 45 
                    ? upload.title.substring(0, 45).concat('...') 
                    : upload.title}
                  </Link>
                  <span className="text-xs text-zinc-500 font-mono">
                    {upload.slug.length > 45 
                    ? upload.slug.substring(0, 45).concat('...') 
                    : upload.slug}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-zinc-400">
                {formatDuration(upload.duration ?? 0)}
              </TableCell>

              <TableCell className="text-zinc-400">
                {((upload.sizeInBytes ?? 0) / (1024 * 1024)).toFixed(2)} MB
              </TableCell>

              <TableCell>
                <UploadStatus status={upload.status!} />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-6 border border-zinc-800">
                    {upload.author?.avatarURL && <AvatarImage src={upload.author.avatarURL} />}
                    <AvatarFallback className="text-[10px] bg-zinc-800 text-zinc-400">
                      {upload.author?.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-zinc-400 whitespace-nowrap">
                    {dayjs(upload.createdAt).fromNow()}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <button className="p-2 cursor-pointer hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 hover:text-zinc-100">
                  <Trash className="size-4 text-red-600" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
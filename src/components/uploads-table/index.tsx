import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { UploadStatus } from "../upload-status"
import { MoreHorizontal } from "lucide-react"

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function UploadsTable() {

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const uploads = [
    {
      id: crypto.randomUUID(),
      title: 'Criando seed com Drizzle',
      slug: 'criando-seed-com-drizzle',
      duration: 757,
      size: 90.73,
      status: 'ready',
      uploadedAt: new Date(),
      uploadedByUser: {
        id: crypto.randomUUID(),
        name: 'Jhon Doe',
        avatarURL: 'https://github.com/shadcn.png',
      },
    },
    {
      id: crypto.randomUUID(),
      title: 'Criando API com Bun e Elysia',
      slug: 'criando-api-com-bun-e-elysia',
      duration: 1500,
      size: 190.1,
      status: 'processing',
      uploadedAt: new Date(),
      uploadedByUser: {
        id: crypto.randomUUID(),
        name: 'Jane Smith',
        avatarURL: 'https://github.com/janesmith.png',
      },
    },
    {
      id: crypto.randomUUID(),
      title: 'Aprendendo React com Hooks',
      slug: 'aprendendo-react-com-hooks',
      duration: 1200,
      size: 150.5,
      status: 'expired',
      uploadedAt: new Date(),
      uploadedByUser: {
        id: crypto.randomUUID(),
        name: 'Jane Smith',
        avatarURL: 'https://github.com/janesmith.png',
      },
    },
    {
      id: crypto.randomUUID(),
      title: 'Introdução ao TypeScript',
      slug: 'introducao-ao-typescript',
      duration: 900,
      size: 120.0,
      status: 'ready',
      uploadedAt: new Date(),
      uploadedByUser: {
        id: crypto.randomUUID(),
        name: 'Alice Johnson',
        avatarURL: 'https://github.com/alicejohnson.png',
      },
    },
    {
      id: crypto.randomUUID(),
      title: 'Conectando no PostgreSQL',
      slug: 'conectando-no-postgresql',
      duration: 900,
      size: 120.0,
      status: 'processing',
      uploadedAt: new Date(),
      uploadedByUser: {
        id: crypto.randomUUID(),
        name: 'Alice Johnson',
        avatarURL: 'https://github.com/alicejohnson.png',
      },
    },
  ]

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
                  <span className="font-semibold text-zinc-100 leading-none">
                    {upload.title}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {upload.slug}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-zinc-400">
                {formatDuration(upload.duration)}
              </TableCell>

              <TableCell className="text-zinc-400">
                {upload.size.toFixed(2)} MB
              </TableCell>

              <TableCell>
                <UploadStatus status={upload.status} />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-6 border border-zinc-800">
                    <AvatarImage src={upload.uploadedByUser.avatarURL} />
                    <AvatarFallback className="text-[10px] bg-zinc-800 text-zinc-400">
                      {upload.uploadedByUser.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-zinc-400 whitespace-nowrap">
                    {dayjs(upload.uploadedAt).fromNow()}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <button className="p-2 cursor-pointer hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 hover:text-zinc-100">
                  <MoreHorizontal className="size-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
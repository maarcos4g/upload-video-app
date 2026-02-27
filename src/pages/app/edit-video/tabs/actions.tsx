import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { GetUploadActionsResponse } from "@/http/get-upload-actions/types"
import { CheckCircle2, CircleX, Loader2 } from "lucide-react"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

type ActionsTabProps = GetUploadActionsResponse & {}

export function ActionsTab({ actions: uploadActions }: ActionsTabProps) {
  return (
    <div className='border border-zinc-800 rounded-md py-1'>
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400 font-normal text-sm" colSpan={2}>Ação</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Status</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Executado em</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Finalizado em</TableHead>
            <TableHead className="text-zinc-400 font-normal text-sm">Duração</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploadActions && uploadActions.map((action) => {
            return (
              <TableRow key={action.id} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group cursor-pointer">
                <TableCell colSpan={2} className="h-15">
                  <span className="text-sm font-bold uppercase">{action.type}</span>
                </TableCell>
                <TableCell>
                  {action.status === 'success' ? (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm">
                      <CheckCircle2 className="size-4" />
                      Sucesso
                    </span>
                  ) :
                    action.status === 'error' ? (
                      <span className="flex items-center gap-2 text-red-700 text-sm">
                        <CircleX className="size-4" />
                        Erro
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-amber-500 text-sm">
                        <Loader2 className="size-4 animate-spin" />
                        Executando...
                      </span>
                    )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-500">
                    {dayjs().to(action.createdAt)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-500">
                    {action.status === 'success' ? dayjs().to(action.completedAt) : '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-500">
                    {action.status === 'success' && action.completedAt
                      ? (
                        (() => {
                          const diff = dayjs(action.completedAt).diff(dayjs(action.createdAt))
                          return dayjs.duration(diff).format('mm:ss')
                        })()
                      )
                      : ('-')}
                  </span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
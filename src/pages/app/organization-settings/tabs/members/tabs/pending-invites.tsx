import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Trash2, User2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { GetPendingInvitesResponse } from "@/http/get-pending-invites/types"

export function PendingInvites({ invitations }: GetPendingInvitesResponse) {
  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-md py-1'>
      <Table className="bg-zinc-900">
        {invitations.length > 0 ? (
          <TableBody>
            {invitations && invitations.map((invite) => (
              <TableRow key={invite.id} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group">
                <TableCell>
                  <div
                    className="flex px-3 py-2 gap-3"
                  >
                    <Avatar className="size-8">
                      <AvatarFallback>
                        <User2 className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center">
                      <p className="text-sm text-zinc-500">{invite.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex px-2 py-1 justify-end items-center gap-10">
                    <Select value={invite.role}>
                      <SelectTrigger className="w-full min-h-10 border-zinc-800 max-w-40 cursor-not-allowed" disabled>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent
                        className="bg-zinc-900 text-zinc-300 border-zinc-800"
                      >
                        <SelectGroup>
                          <SelectItem className="focus:bg-zinc-800 focus:text-zinc-100" value="member">Membro</SelectItem>
                          <SelectItem className="focus:bg-zinc-800 focus:text-zinc-100" value="admin">Admin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <button>
                      <Trash2 className="size-4 text-red-500 cursor-pointer" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableRow className="border-transparent hover:bg-zinc-900/40 transition-colors group">
            <div
              className='w-full flex items-center justify-center py-10 text-sm text-zinc-300'
            >
              Nenhum convite pendente.
            </div>
          </TableRow>
        )}
      </Table>
    </div>
  )
}
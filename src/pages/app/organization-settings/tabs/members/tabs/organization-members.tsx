import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { GetMembershipsResponse } from "@/http/get-memberships/types"
import { useProfile } from "@/http/profile"
import type { GetMembershipResponse } from "@/http/get-membership/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrganizationMembersProps = GetMembershipsResponse & {
  membership: GetMembershipResponse
}

export function OrganizationMembers({ memberships, membership: userMembership }: OrganizationMembersProps) {

  const { data: profile } = useProfile()

  const sortedMemberships = [...memberships].sort((a, b) => {
    if (a.user.id === profile?.id) return -1
    if (b.user.id === profile?.id) return 1
    return 0
  })

  const isAdmin = userMembership.membership.role === 'admin'

  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-md py-1'>
      <Table className="bg-zinc-900">
        {memberships.length > 0 ? (
          <TableBody>
            {sortedMemberships.map((membership, index) => (
              <TableRow key={membership.id} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group">
                <TableCell>
                  <div
                    className="flex px-3 py-2 gap-3"
                  >
                    <Avatar className="size-8">
                      {membership.user.avatarURL && <AvatarImage src={membership.user.avatarURL} />}
                      <AvatarFallback>{membership.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-sm text-zinc-100 font-semibold">{membership.user.name} {index === 0 && ' (eu)'}</span>
                      <p className="text-xs text-zinc-500">{membership.user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex px-3 py-2 justify-end items-center gap-10">
                    <Select value={membership.role}>
                      <SelectTrigger className="w-full min-h-10 border-zinc-800 max-w-40 disabled:cursor-not-allowed" disabled={!isAdmin}>
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
                    <button
                      disabled={!isAdmin}
                      className="disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                      onClick={() => console.log(membership.id)}
                    >
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
              Não existe nenhum membro na organização.
            </div>
          </TableRow>
        )}
      </Table>
    </div>
  )
}
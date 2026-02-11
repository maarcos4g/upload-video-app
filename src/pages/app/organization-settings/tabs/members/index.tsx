import { Input } from "@/components/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs-underline";
import { Link } from "lucide-react";
import { OrganizationMembers } from "./tabs/organization-members";
import { PendingInvites } from "./tabs/pending-invites";
import { useParams } from "react-router-dom";
import { useGetPendingInvites } from "@/http/get-pending-invites";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMemberships } from "@/http/get-memberships";

export function MembersTab() {

  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading } = useGetPendingInvites({ slug: slug! })
  const { data: memberships, isLoading: loadingMemberships } = useGetMemberships({ slug: slug! })

  return (
    <div
      className="w-full flex flex-col gap-6"
    >
      <div
        className="flex items-center justify-between pb-6 border-b border-zinc-900"
      >
        <div className="space-y-3">
          <h1 className="font-semibold text-zinc-50">Convidar membros</h1>
          <p className="text-sm text-zinc-500">Convide novo membros através do endereço de e-mail</p>
          <button
            className="border border-zinc-800 rounded flex items-center px-2 py-1 gap-2 text-xs text-zinc-100 cursor-pointer"
          >
            <Link className="size-3" />
            Link de convite
          </button>
        </div>

        <form className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm text-zinc-300"
              >
                E-mail
              </label>

              <Input
                type="email"
                id="email"
                name="email"
                className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm border-zinc-800"
                placeholder="jhon.doe@acme.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm text-zinc-300"
              >
                Perfil
              </label>

              <Select>
                <SelectTrigger className="w-full min-h-10 border-zinc-800">
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
            </div>
          </div>

          <button
            type="submit"
            disabled
            className="w-full bg-zinc-200 text-zinc-900 py-1.5 rounded text-sm disabled:bg-zinc-700 disabled:text-zinc-100 transition-colors cursor-pointer"
          >
            Enviar Convite
          </button>
        </form>
      </div>

      <Tabs defaultValue="tab-1">
        <div className="">
          <TabsList variant="underline">
            <TabsTab value="tab-1">Membros da Organização ({memberships?.memberships.length})</TabsTab>
            <TabsTab value="tab-2">Convites pendentes ({data?.invitations.length})</TabsTab>
          </TabsList>
        </div>
        <TabsPanel value="tab-1">
          {loadingMemberships ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full bg-zinc-900" />
              ))}
            </div>
          ) : (
            <OrganizationMembers memberships={memberships?.memberships ? memberships.memberships : []} />
          )}
        </TabsPanel>
        <TabsPanel value="tab-2">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full bg-zinc-900" />
              ))}
            </div>
          ) : (
            <PendingInvites invitations={data?.invitations ? data?.invitations : []} />
          )}
        </TabsPanel>
      </Tabs>
    </div>
  )
}
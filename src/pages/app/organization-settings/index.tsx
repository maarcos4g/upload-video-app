import { ChartNoAxesCombined, Settings2, UsersRound, type LucideIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralTab } from "./tabs/general"
import { MembersTab } from "./tabs/members"
import { UsageTab } from "./tabs/usage"

interface SideBarOptions {
  option: string
  value: string
  icon: LucideIcon
}

export function OrganizationSettings() {

  const sidebarOptions: SideBarOptions[] = [
    {
      value: 'general',
      option: 'Geral',
      icon: Settings2
    },
    {
      value: 'members',
      option: 'Membros',
      icon: UsersRound
    },
    {
      value: 'usage',
      option: 'Uso e Armazenamento',
      icon: ChartNoAxesCombined
    },
  ]

  return (
    <div
      className="w-full flex flex-col flex-1 px-6 py-4 gap-6"
    >
      <h1 className="font-bold text-zinc-50 text-lg">Configurações da Organização</h1>

      <Tabs defaultValue="general" className="grid grid-cols-[314px_1fr] flex-1">
        <TabsList className="flex flex-col bg-transparent gap-2 justify-start items-start w-[80%]">
          {sidebarOptions.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="w-full justify-start items-center gap-2 px-4 py-2 text-zinc-500 hover:bg-zinc-800/50 data-[state=active]:bg-zinc-800/50 data-[state=active]:text-zinc-300 hover:text-zinc-300 transition-colors rounded-md bg-transparent"
            >
              <item.icon className="size-4" />
              <span className="text-sm font-medium">{item.option}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 max-w-4xl">
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>
          
          <TabsContent value="members">
            <MembersTab />
          </TabsContent>
          
          <TabsContent value="usage">
            <UsageTab />
          </TabsContent>

        </div>
      </Tabs>

    </div>
  )
}
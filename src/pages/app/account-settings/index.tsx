import { TabsTrigger, TabsContent, Tabs, TabsList } from "@/components/ui/tabs";
import { User2 } from "lucide-react";
import { GeneralTab } from "./tabs/general";

export function AccountSettings() {
  return (
    <div
      className="flex flex-col flex-1 px-6 py-2 gap-4"
    >
      <h1 className="font-bold text-zinc-50 text-lg">Configurações da Conta</h1>

      <Tabs defaultValue="general" className="grid grid-cols-[314px_1fr] flex-1">
        <TabsList className="flex flex-col bg-transparent gap-2 justify-start items-start w-[80%]">
          <TabsTrigger
            value="general"
            className="w-full justify-start items-center gap-2 px-4 py-2 text-zinc-500 hover:bg-zinc-800/50 data-[state=active]:bg-zinc-800/50 data-[state=active]:text-zinc-300 hover:text-zinc-300 transition-colors rounded-md bg-transparent"
          >
            <User2 className="size-4" />
            <span className="text-sm font-medium">Geral</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 max-w-4xl">
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>

        </div>
      </Tabs>
    </div>
  )
}
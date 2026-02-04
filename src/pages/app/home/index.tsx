import { Building2 } from "lucide-react";

export function Home() {
  return (
    <main
      className="w-full flex flex-col gap-2 flex-1 items-center justify-center"
    >
      <Building2 className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground text-center">
        Selecione ou crie uma organização
      </p>
    </main>
  )
}

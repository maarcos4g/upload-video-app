import { useGetOrganizations } from "@/http/get-organizations";
import { Building2, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {

  const navigate = useNavigate()
  const { data, isLoading } = useGetOrganizations()

  useEffect(() => {
    if (isLoading || !data) return;

    const hasOrganizations = data.organizations.length > 0

    if (hasOrganizations) {
      const lastSlug = localStorage.getItem('@upload.video:last-org-slug')
      const lastOrganizationStillExists = data.organizations.some(org => org.slug === lastSlug)

      if (lastSlug && lastOrganizationStillExists) {
        navigate(`/org/${lastSlug}`, { replace: true })
      } else {
        navigate(`/org/${data.organizations[0].slug}`, { replace: true })
      }
    }
  }, [data, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <Loader2 className="size-6 animate-spin text-zinc-500" />
      </div>
    )
  }

  return (
    <main
      className="w-full flex flex-col gap-2 flex-1 items-center justify-center"
    >
      <Building2 className="size-6 text-muted-foreground" />
      <h2 className="text-lg font-bold text-zinc-200">Bem-vindo ao painel</h2>
      <p className="text-sm text-muted-foreground text-center">
        Selecione ou crie uma organização
      </p>
    </main>
  )
}

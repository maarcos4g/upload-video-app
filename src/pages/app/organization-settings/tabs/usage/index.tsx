import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentOrganization } from "@/hooks/use-current-organization"
import { useGetOrganizationUsage } from "@/http/get-usage"
import { HardDrive, ArrowUpRight } from "lucide-react"

// Função utilitária para converter Bytes em GB/MB bonitos
function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function UsageTab() {
  const { slug } = useCurrentOrganization()

  const { data, isLoading } = useGetOrganizationUsage({ slug: slug! })

  const usagePercentage = ((data?.storageUsedBytes ?? 0) / (data?.storageLimitBytes ?? 0)) * 100
  const isNearLimit = usagePercentage > 85

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-1 border-b border-zinc-800 pb-4">
        <h2 className="text-lg font-semibold text-zinc-100">Uso e Armazenamento</h2>
        <p className="text-sm text-zinc-500">
          Acompanhe o consumo de recursos e os limites do plano da sua organização.
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="w-full h-48" />
      ) : (
        <div className="border border-zinc-800 bg-zinc-900/50 rounded-xl overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-400 font-medium text-sm">
                <HardDrive className="size-4" />
                Armazenamento de Vídeos
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-zinc-100">
                  {formatBytes(data?.storageUsedBytes ?? 0)}
                </span>
                <span className="text-sm text-zinc-500 font-medium">
                  / {formatBytes(data?.storageLimitBytes ?? 0)}
                </span>
              </div>
            </div>

            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 font-semibold text-sm rounded-md hover:bg-zinc-200 transition-colors cursor-not-allowed disabled:opacity-50"
            >
              Fazer Upgrade <ArrowUpRight className="size-4" />
            </button>
          </div>

          <div className="bg-zinc-950 px-6 py-4 border-t border-zinc-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className={isNearLimit ? "text-amber-500" : "text-zinc-400"}>
                {usagePercentage.toFixed(1)}% utilizado
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isNearLimit ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
import { useCurrentOrganization } from "@/hooks/use-current-organization"
import { useCreateBillingPortal } from "@/http/create-billing-portal"
import { useCreateCheckout } from "@/http/create-checkout"
import { useGetPlans } from "@/http/get-plans"
import { formatPrice } from "@/utils/format-price"
import { ArrowLeftRight, CheckCircle2, ExternalLink, Loader2 } from "lucide-react"
import { useMemo } from "react"

export function BillingTab() {
  const { organization } = useCurrentOrganization()

  const { data: plansData } = useGetPlans()

  const currentPlan = plansData?.plans.find(p => p.id === organization?.planId)

  const { mutateAsync: createBillingPortal, isPending } = useCreateBillingPortal()
  const { mutateAsync: createCheckout, isPending: isPendingCheckout } = useCreateCheckout()

  async function handleManageSubscription() {
    try {
      const { portalURL } = await createBillingPortal({ slug: organization?.slug ?? '' })
      window.location.href = portalURL
    } catch (error) {
      console.error()
    }
  }

  async function handleUpgradePlan(planSlug: string) {
    try {
      const { checkoutURL } = await createCheckout({
        slug: organization?.slug ?? '',
        planSlug: planSlug
      })
      window.location.href = checkoutURL
    } catch (error) {
      console.error('Erro ao gerar o checkout', error)
    }
  }

  const sortedPlans = useMemo(() => {
    if (!plansData?.plans) return []

    const currentPlan = plansData.plans.find(plan => plan.id === organization?.planId)

    const otherPlans = plansData.plans.filter(plan => plan.id !== organization?.planId && plan.slug !== 'hobby')

    const sortedOtherPlans = otherPlans.sort((a, b) => {
      const priceA = parseInt(a.priceInCents || '0', 10)
      const priceB = parseInt(b.priceInCents || '0', 10)
      return priceA - priceB
    })

    return currentPlan ? [currentPlan, ...sortedOtherPlans] : sortedOtherPlans

  }, [plansData?.plans, organization?.planId])

  return (
    <div className="w-full flex flex-col gap-10 pb-10">

      <div className="flex flex-col gap-1 border-b border-zinc-800 pb-4">
        <h2 className="text-lg font-semibold text-zinc-100">Assinatura</h2>
        <p className="text-sm text-zinc-500">
          Gerencie sua assinatura, métodos de pagamento e histórico de faturas.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-zinc-100">Plano Atual</h3>
        <div className="flex items-center justify-between p-6 border border-zinc-800 bg-zinc-900/30 rounded-xl">
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-zinc-100">
              {currentPlan?.name}
            </span>
            <span className="text-sm text-zinc-500">
              Limites e consumos podem ser vistos na aba de Uso.
            </span>
          </div>
          <button
            disabled={isPending}
            onClick={handleManageSubscription}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-sm font-semibold rounded-md text-zinc-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <>
                Gerenciar plano <ExternalLink className="size-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-4 pb-6 mt-4">
        {sortedPlans.map((plan) => {
          const currentPlan = plan.id === organization?.planId

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col p-6 rounded-xl border bg-zinc-900/30 gap-6 transition-all ${currentPlan
                ? 'border-emerald-500/30 shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)]'
                : 'border-zinc-800'
                }`}
            >
              {currentPlan && (
                <div className="absolute -top-px left-10 right-10 h-px bg-linear-to-r from-transparent via-emerald-700 to-transparent opacity-50" />
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-zinc-100">{plan.name}</h3>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-zinc-50">
                    {formatPrice(plan.priceInCents)}
                  </span>
                  {plan.priceInCents !== '0' && plan.priceInCents !== null && (
                    <span className="text-sm text-zinc-500 font-medium">/mês</span>
                  )}
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed min-h-10">
                  {plan.description ?? ''}
                </p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className={`size-4 shrink-0 mt-0.5 ${currentPlan ? 'text-emerald-500' : 'text-zinc-600'}`} />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {!currentPlan && (
                <button
                  onClick={() => handleUpgradePlan(plan.slug)}
                  disabled={isPendingCheckout}
                  className="mt-2 w-full py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer bg-zinc-100 hover:bg-zinc-300 text-zinc-800 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPendingCheckout ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <ArrowLeftRight className="size-4" />
                      Trocar de plano
                    </>
                  )}
                </button>
              )}
              {currentPlan && (
                <div className="mt-2 w-full py-3 text-center font-semibold text-sm text-emerald-500">
                  Plano atual
                </div>
              )}
            </div>
          )
        })}
      </div>


      {/* <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-sm font-semibold text-zinc-100">Histórico de Faturas</h3>

        <div className="flex flex-col border border-zinc-800 bg-zinc-900/30 rounded-xl overflow-hidden">

          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-4 border-b border-zinc-800 text-sm font-medium text-zinc-400">
            <span>Data</span>
            <span>Descrição</span>
            <span>Valor</span>
            <span className="w-16"></span>
          </div>

          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-4 border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/20 transition-colors group">
            <div className="flex items-center gap-3 min-w-35">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span className="text-sm text-zinc-300">Mar 2, 2026</span>
            </div>
            <span className="text-sm text-zinc-400">Assinatura baseada em uso</span>
            <span className="text-sm font-medium text-zinc-200 mr-4">$ 5.00</span>
            <button className="text-sm text-zinc-500 hover:text-zinc-300 font-medium flex items-center gap-1">
              Ver <ExternalLink className="size-3" />
            </button>
          </div>

          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-4 border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/20 transition-colors group opacity-60">
            <div className="flex items-center gap-3 min-w-35">
              <XCircle className="size-4 text-zinc-500" />
              <span className="text-sm text-zinc-400">May 29, 2025</span>
            </div>
            <span className="text-sm text-zinc-500">Assinatura baseada em uso (Void)</span>
            <span className="text-sm font-medium text-zinc-400 mr-4">$ 0.00</span>
            <button className="text-sm text-zinc-500 hover:text-zinc-300 font-medium flex items-center gap-1">
              Ver <ExternalLink className="size-3" />
            </button>
          </div>

        </div>
      </div> */}

    </div >
  )
}
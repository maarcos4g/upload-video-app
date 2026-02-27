import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrentCollection } from "@/hooks/use-current-collection";
import { useCurrentOrganization } from "@/hooks/use-current-organization";
import { useGetCollections } from "@/http/get-collections";
import { flattenCollections } from "@/utils/flatten-collections";
import { ArrowRight } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "sonner";

type SelectCollectionDialogProps = {
  onConfirm: () => void
}

export function SelectCollectionDialog({ onConfirm }: SelectCollectionDialogProps) {

  const { slug } = useCurrentOrganization()

  const { data: collections } = useGetCollections({
    slug: slug!
  })

  const flatCollections = collections ? flattenCollections(collections.collections) : []

  const { get: currentCollectionId, set: setCurrentCollection } = useCurrentCollection()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!currentCollectionId) {
      toast.error('Selecione uma coleção para continuar')
      return
    }

    onConfirm()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Selecione a coleção</DialogTitle>
        <DialogDescription className="text-xs">Selecione a coleção para o lote de vídeos</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div
          className="flex flex-col gap-4"
        >
          <Select
            // value={currentCollectionId ?? undefined}
            onValueChange={(collectionId) => setCurrentCollection(collectionId)}
          >
            <SelectTrigger className="w-full border-zinc-700">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent
              className="bg-zinc-900 text-zinc-100 border-zinc-700"
            >
              <SelectGroup>
                {flatCollections.map((collection) => (
                  <SelectItem
                    key={collection.id}
                    className="focus:bg-zinc-800 focus:text-zinc-100"
                    value={collection.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{collection.name}</span>
                      {collection.parentName && (
                        <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">
                          Dentro de: {collection.parentName}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-emerald-950 rounded-md gap-2 text-sm font-semibold cursor-pointer hover:bg-emerald-950/50"
            // disabled={isPending === true}
            >
              <span>Continuar</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
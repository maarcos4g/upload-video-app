import { CollectionTree } from "@/components/collection-tree";
import { Folder, Plus } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { UploadsTable } from "@/components/uploads-table";
import { useGetCollections } from "@/http/get-collections";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateCollectionDialog } from "@/components/create-collection-dialog";
import { useGetOrganizationUploads } from "@/http/get-uploads";
import { useCurrentOrganization } from "@/hooks/use-current-organization";
import { useCurrentCollection } from "@/hooks/use-current-collection";

export function OrganizationDashboard() {
  const { slug } = useCurrentOrganization()

  const { data, isLoading } = useGetCollections({ slug: slug! })

  const collections = data?.collections ?? []

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { set: setCurrentCollectionId, get: getCurrentCollectionId } = useCurrentCollection()

  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(
    getCurrentCollectionId()
  )

  const { data: organizationUploads, isLoading: loadingOrganizationUploads } = useGetOrganizationUploads({
    slug: slug!,
    collectionId: selectedCollectionId ?? undefined
  })

  function handleSelectCollection(id: string | null) {
    const normalizedId = (id === '' || id === 'null') ? null : id

    setCurrentCollectionId(normalizedId as string)
    setSelectedCollectionId(normalizedId)
  }

  return (
    <div
      className="w-full flex-1 grid grid-cols-[314px_1fr]"
    >
      <aside
        className="px-6 py-4 space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-zinc-50">Coleções</h1>

          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <DialogTrigger className="cursor-pointer">
              <button>
                <Plus className="size-5" />
              </button>
            </DialogTrigger>
            <CreateCollectionDialog collections={collections} onClose={() => setIsDialogOpen(false)} />
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full bg-zinc-800" />
            <Skeleton className="h-6 w-3/4 bg-zinc-800 mx-2" />
          </div>
        ) : collections.length > 0 ? (
          <CollectionTree
            items={collections}
            selectedId={selectedCollectionId}
            onSelect={handleSelectCollection}
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-10 text-zinc-600">
            <Folder className="size-6 mb-2" />
            <p className="text-xs">Nenhuma coleção criada.</p>
          </div>
        )}
      </aside>

      <div className="px-4 py-2 flex flex-col space-y-5">
        <div
          className="flex items-center justify-between"
        >
          <h1 className="text-xl font-bold text-zinc-50">Uploads</h1>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500">
                Armazenamento
              </span>

              <span
                className="text-xs font-medium text-zinc-200"
              >
                4.5GB
                <span className="text-zinc-500">/10GB</span>
              </span>
            </div>

            <Progress className="w-74" value={45} />
          </div>
        </div>

        {loadingOrganizationUploads ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map(() => (
              <Skeleton className="w-full h-10" />
            ))}
          </div>
        ) :
          organizationUploads && organizationUploads.uploads.length > 0 ? (
            <UploadsTable uploads={organizationUploads.uploads} slug={slug!} />
          ) : (
            <div className="w-full flex flex-col flex-1 items-center justify-center">
              <Folder className="size-8 text-zinc-700 mb-4" />
              <h1 className="text-zinc-500 font-medium">
                Nenhum upload encontrado nesta coleção ou organização
              </h1>
            </div>
          )}
      </div>
    </div>
  )
}
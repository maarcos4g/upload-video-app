import { Check, Loader2 } from "lucide-react";
import { Input } from "../input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "../ui/sheet";
import type { Collection } from "@/http/get-collections/types";
import { useState } from "react";
import { useGetCollections } from "@/http/get-collections";
import { Skeleton } from "../ui/skeleton";
import { flattenCollections } from "@/utils/flatten-collections";
import { useUpdateCollection } from "@/http/update-collection";
import { useFormState } from "@/hooks/use-form-state";
import { handleUpdateCollection } from "./actions";
import { useCurrentOrganization } from "@/hooks/use-current-organization";

type UpdateCollectionSheetProps = {
  collection: Collection
}

export function UpdateCollectionSheet({ collection: currentCollection }: UpdateCollectionSheetProps) {
  const [selectedParentId, setSelectedParentId] = useState<string>(currentCollection.parentId ?? 'none')

  const { slug } = useCurrentOrganization()

  const { data, isLoading } = useGetCollections({ slug: slug! })

  const options = data?.collections ? flattenCollections(data.collections) : [];

  const { mutateAsync: updateCollection } = useUpdateCollection()

  const [{ errors }, handleSubmit, isPending] = useFormState(
    (data) => handleUpdateCollection(data, updateCollection)
  )

  return (
    <SheetContent
      className="bg-zinc-950 border-zinc-700 text-zinc-100"
    >
      <SheetHeader>
        <SheetTitle className="text-zinc-100">Editar coleção</SheetTitle>
        <SheetDescription>Edite as informações da sua coleção.</SheetDescription>
      </SheetHeader>
      <form className="px-4 space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold"
          >
            Nome da Coleção
          </label>

          <Input
            type="text"
            id="name"
            name="name"
            className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
            defaultValue={currentCollection.name}
          />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="parentId"
            className="text-sm font-semibold"
          >
            Coleção-pai
          </label>

          <input type="hidden" name="parentId" value={selectedParentId} />
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="collectionId" value={currentCollection.id} />

          {errors?.parentId && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.parentId[0]}
            </p>
          )}

          {errors?.slug && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.slug[0]}
            </p>
          )}

          {errors?.collectionId && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.collectionId[0]}
            </p>
          )}

          {isLoading ? (
            <Skeleton className="w-full h-10" />
          ) : (
            <Select
              value={selectedParentId}
              onValueChange={setSelectedParentId}
            >
              <SelectTrigger className="w-full border-zinc-700">
                <SelectValue placeholder="Selecione uma coleção" />
              </SelectTrigger>
              <SelectContent
                className="bg-zinc-900 text-zinc-100 border-zinc-700"
              >
                <SelectGroup>
                  <SelectItem value='none'>
                    Nenhuma
                  </SelectItem>
                  {options
                    .filter(c => c.id !== currentCollection.id)
                    .map((collection) => (
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
          )}
        </div>

        <div className="flex items-center justify-end gap-4">
          <SheetClose className="border border-zinc-700 p-2 rounded-md text-sm text-zinc-400">
            Cancelar
          </SheetClose>
          <button
            type="submit"
            className="flex gap-2 items-center px-4 py-2 bg-emerald-900 text-zinc-100 rounded-md text-sm cursor-pointer hover:opacity-80 transition-all"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Check className="size-4" />
                Salvar
              </>
            )}
          </button>
        </div>
      </form>
    </SheetContent>
  )
}
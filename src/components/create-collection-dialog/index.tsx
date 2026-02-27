import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "../input";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Collection } from "@/http/get-collections/types";
import { flattenCollections } from "@/utils/flatten-collections";
import { useEffect, useState } from "react";
import { useFormState } from "@/hooks/use-form-state";
import { handleCreateCollection } from "./actions";
import { toast } from "sonner";
import { useCreateCollection } from "@/http/create-collection";
import { useCurrentOrganization } from "@/hooks/use-current-organization";

interface CreateOrganizationDialogProps {
  collections: Collection[]
  onClose: () => void;
}

export function CreateCollectionDialog({ collections, onClose }: CreateOrganizationDialogProps) {
  const { slug } = useCurrentOrganization()
  const flatCollections = flattenCollections(collections)

  const [selectedParentId, setSelectedParentId] = useState<string>('')
  const [hasParent, setHasParent] = useState(false)

  const handleSwitchChange = (checked: boolean) => {
    setHasParent(checked)
    if (!checked) {
      setSelectedParentId('')
    }
  }

  const { mutateAsync: createCollection } = useCreateCollection()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    (data) => handleCreateCollection(data, createCollection),
    async () => {
      onClose()
    }
  )

  if (success === false && message) {
    toast.error(message)
  }

  useEffect(() => {
    if (success) {
      setHasParent(false)
      setSelectedParentId('')
    }
  }, [success])

  return (
    <DialogContent
      className="bg-zinc-900 text-accent border-zinc-700 px-4 py-6"
    >
      <DialogHeader>
        <DialogTitle>Criar Coleção</DialogTitle>
        <DialogDescription className="text-xs">Crie coleçõs e organize seus uploads.</DialogDescription>
      </DialogHeader>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div
          className="bg-zinc-900/80 p-2 rounded-md border border-zinc-800 shadow-lg shadow-zinc-900 space-y-4"
        >
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
              placeholder="Nome da nova coleção"
            />

            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Switch
              name="hasParentId"
              id="hasParentId"
              checked={hasParent}
              onCheckedChange={handleSwitchChange}
            />

            <label
              htmlFor="hasParentId"
              className="text-sm font-semibold"
            >
              A coleção faz parte de outra coleção?
            </label>
          </div>

          <input type="hidden" name="organizationSlug" value={slug} />

          {hasParent && (
            <div
              className="flex flex-col gap-2"
            >
              <label
                htmlFor="parentId"
                className="text-sm font-semibold"
              >
                Selecione a coleção
              </label>

              <input type="hidden" name="parentId" value={selectedParentId} />

              <Select
                value={selectedParentId}
                onValueChange={setSelectedParentId}
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

              {errors?.parentId && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.parentId[0]}
                </p>
              )}
            </div>
          )}

        </div>

        <div
          className="flex items-center justify-between"
        >
          <DialogClose
            className="p-2 border border-zinc-700 rounded-md text-sm font-semibold cursor-pointer"
          >
            Cancelar
          </DialogClose>

          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-emerald-950 rounded-md gap-2 text-sm font-semibold cursor-pointer hover:bg-emerald-950/50"
            disabled={isPending === true}
          >
            {!isPending ? (
              <>
                <span>Continuar</span>
                <ArrowRight className="size-4" />
              </>
            ) : (
              <Loader2 className="size-4 animate-spin" />
            )}
          </button>
        </div>
      </form>
    </DialogContent>
  )
}
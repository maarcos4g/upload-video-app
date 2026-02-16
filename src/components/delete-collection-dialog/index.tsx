import { ArrowRight, Loader2, OctagonAlert } from "lucide-react";
import { Input } from "../input";
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import type { Collection } from "@/http/get-collections/types";
import { useState } from "react";
import { useDeleteCollection } from "@/http/delete-collection";
import { handleDeleteCollection } from "./actions";
import { useFormState } from "@/hooks/use-form-state";
import { useParams } from "react-router-dom";

type DeleteCollectionDialogProps = {
  collection: Collection
}

export function DeleteCollectionDialog({ collection }: DeleteCollectionDialogProps) {

  const { slug } = useParams<{ slug: string }>()

  const [verify, setVerify] = useState('')

  const isDisabled = verify.toLowerCase() !== collection.name.toLowerCase()

  const { mutateAsync: deleteCollection } = useDeleteCollection()

  const [_, handleSubmit, isPending] = useFormState(
    (data) => handleDeleteCollection(data, deleteCollection)
  )

  return (
    <DialogContent
      className="bg-zinc-900 text-accent border-zinc-700 p-0"
    >
      <DialogHeader>
        <div className="bg-zinc-950 px-4 py-6 rounded-t-md border-b border-zinc-700 space-y-4">
          <DialogTitle>Deletar Coleção</DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            Tem certeza que deseja excluir essa coleção? <br />
            Todos os <strong>uploads e as coleções</strong> que estiverem vinculadas a ela serão excluidos permanentemente.
          </DialogDescription>
        </div>
      </DialogHeader>

      <form className="flex flex-col px-4 pb-6 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="verify"
            className="text-sm font-semibold mb-1"
          >
            Para confirmar, digite <strong>{collection.name}</strong> abaixo:
          </label>

          <Input
            type="text"
            id="verify"
            name="verify"
            className="min-w-79.5 ring-offset-emerald-950 focus-visible:ring-emerald-950 text-sm"
            value={verify}
            onChange={(event) => setVerify(event.target.value)}
          />
        </div>

        <input type="text" id="slug" name="slug" className="hidden" value={slug} />
        <input type="text" id="collectionId" name="collectionId" className="hidden" value={collection.id} />

        <div
          className="bg-red-700/50 text-red-400 w-full text-sm px-4 py-2 rounded flex gap-2 items-center"
        >
          <OctagonAlert className="size-5" />
          A ação de deletar {collection.name} não poderá ser revertida.
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
            disabled={isDisabled}
            className="flex items-center px-4 py-2 bg-red-500 rounded-md gap-2 text-sm font-semibold cursor-pointer hover:bg-red-500/50 disabled:bg-red-700/50 disabled:cursor-not-allowed disabled:text-red-400"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <span>Continuar</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </DialogContent>
  )
}
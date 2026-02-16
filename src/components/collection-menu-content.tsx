import { Edit, Trash2 } from "lucide-react";
import { ContextMenuContent, ContextMenuItem } from "./ui/context-menu";
import { Sheet } from "./ui/sheet";
import { useState } from "react";
import type { Collection } from "@/http/get-collections/types";
import { Dialog } from "./ui/dialog";
import { DeleteCollectionDialog } from "./delete-collection-dialog";
import { UpdateCollectionSheet } from "./update-collection-sheet";

interface CollectionMenuContentProps {
  currentCollection: Collection
}

export function CollectionMenuContent({ currentCollection }: CollectionMenuContentProps) {
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <ContextMenuContent className="bg-zinc-900 border-zinc-700 text-zinc-100 min-w-40 space-y-1">
        <ContextMenuItem asChild>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full group"
          >
            <Trash2 className="text-zinc-100 group-focus:text-red-500" />
            Deletar
          </button>
        </ContextMenuItem>

        <ContextMenuItem asChild>
          <button
            onClick={() => setShowEditSheet(true)}
            className="w-full group"
          >
            <Edit className="text-zinc-100 group-focus:text-accent-foreground" />
            Editar
          </button>
        </ContextMenuItem>
      </ContextMenuContent>

      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <UpdateCollectionSheet collection={currentCollection} />
      </Sheet>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DeleteCollectionDialog collection={currentCollection} />
      </Dialog>
    </>
  )
}
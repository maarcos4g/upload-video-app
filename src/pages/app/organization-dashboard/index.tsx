import { CollectionTree } from "@/components/collection-tree";
import { Plus } from "lucide-react";
import { useState } from "react";

const collections = [
  {
    id: crypto.randomUUID(),
    name: 'Todos os Uploads',
    children: [
      {
        id: crypto.randomUUID(),
        name: 'Eventos',
        children: []
      },
      {
        id: crypto.randomUUID(),
        name: 'Aulas',
        children: []
      },
      {
        id: crypto.randomUUID(),
        name: 'Vídeos do YouTube',
        children: [
          {
            id: crypto.randomUUID(),
            name: 'Tutoriais',
            children: []
          }
        ]
      },
    ]
  }
]

export function OrganizationDashboard() {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null)


  return (
    <div
      className="w-full flex-1 grid grid-cols-[314px_1fr]"
    >
      <aside
        className="px-6 py-4 space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <h1>Coleções</h1>

          <button>
            <Plus />
          </button>
        </div>

        <CollectionTree
          items={collections}
          selectedId={selectedCollectionId}
          onSelect={setSelectedCollectionId}
        />
      </aside>

      <div className="px-4 py-2 flex items-center justify-center">
        {selectedCollectionId ? `${selectedCollectionId}` : 'Exibindo todos os uploads'}
      </div>
    </div>
  )
}
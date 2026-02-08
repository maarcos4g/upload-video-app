import { useState } from 'react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible'
import { ChevronRight, Folder, FolderOpen } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Collection {
  id: string
  name: string
  children?: Collection[]
}

interface CollectionTreeProps {
  items: Collection[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function CollectionTree({ items, selectedId, onSelect }: CollectionTreeProps) {
  return (
    <div className="flex flex-col gap-1 w-full overflow-x-hidden">
      {items.map((item) => (
        <TreeItem key={item.id} item={item} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </div>
  )
}

function TreeItem({ item, selectedId, onSelect }: { item: Collection } & Omit<CollectionTreeProps, 'items'>) {
  const [isOpen, setIsOpen] = useState(false)
  const isSelected = selectedId === item.id
  const hasChildren = item.children && item.children.length > 0

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild data-selected={isSelected}>
        <button
          onClick={() => onSelect(item.id)}
          className={cn(
            "flex items-center gap-2 w-full p-1.5 rounded-sm transition-colors text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 data-[selected=true]:bg-zinc-800",
            isOpen && "text-zinc-100"
          )}>
          <ChevronRight className={cn("size-3.5 transition-transform", isOpen && "rotate-90")} />
          {isOpen ? (
            <FolderOpen className={cn(
              "size-4",
              isOpen && "text-zinc-100",
              !isOpen && "text-zinc-500",
              isSelected && 'text-emerald-600'
            )} />
          ) : (
            <Folder className="size-4 text-zinc-500" />
          )}
          <span className="text-sm truncate">{item.name}</span>
        </button>
      </CollapsibleTrigger>

      {hasChildren && (
        <CollapsibleContent className="pl-4 ml-3 border-l border-zinc-800 data-[state=open]:animate-in data-[state=closed]:animate-out fade-in duration-200">
          <CollectionTree items={item.children!} selectedId={selectedId} onSelect={onSelect} />
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}
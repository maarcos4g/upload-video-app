import { useState } from 'react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible'
import { ChevronRight, Folder, FolderOpen } from 'lucide-react'
import { cn } from "@/lib/utils"
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'
import { CollectionMenuContent } from './collection-menu-content'
import type { Collection } from '@/http/get-collections/types'

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
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex flex-col">
            <div
              data-selected={isSelected}
              className={cn(
                "group flex items-center gap-2 w-full p-1.5 rounded-sm transition-colors text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 data-[selected=true]:bg-zinc-800",
                isOpen && "text-zinc-100"
              )}
            >
              <CollapsibleTrigger asChild>
                <div className='flex gap-2'>

                  <button className="p-0.5 hover:bg-zinc-700 rounded-sm transition-colors">
                    <ChevronRight className={cn("size-3.5 transition-transform", isOpen && "rotate-90")} />
                  </button>

                  <div
                    className="flex items-center gap-2 flex-1 cursor-pointer"
                    onClick={() => onSelect(isSelected ? '' : item.id)}
                  >
                    {isOpen ? (
                      <FolderOpen className={cn("size-4", isSelected ? 'text-emerald-600' : 'text-zinc-100')} />
                    ) : (
                      <Folder className="size-4 text-zinc-500" />
                    )}
                    <span className="text-sm truncate select-none">{item.name}</span>
                  </div>
                </div>
              </CollapsibleTrigger>

            </div>

            {hasChildren && (
              <CollapsibleContent className="pl-4 ml-3 border-l border-zinc-800 data-[state=open]:animate-in data-[state=closed]:animate-out fade-in duration-200">
                <CollectionTree items={item.children!} selectedId={selectedId} onSelect={onSelect} />
              </CollapsibleContent>
            )}
          </div>
        </Collapsible>
      </ContextMenuTrigger>

      <CollectionMenuContent currentCollection={item} />
    </ContextMenu>
  )
}
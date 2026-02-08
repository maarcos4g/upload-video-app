import type { Collection } from "@/http/get-collections/types";

type FlattenedCollection = Omit<Collection, "children" | "createdAt" | "ownerId" | "parentId"> & {
  parentName?: string
}

export function flattenCollections(
  collections: Collection[],
  parentName?: string
): FlattenedCollection[] {
  return collections.reduce((acc, collection) => {
    acc.push({
      id: collection.id,
      name: collection.name,
      parentName: parentName
    });

    if (collection.children && collection.children.length > 0) {
      acc.push(...flattenCollections(collection.children, collection.name));
    }

    return acc;
  }, [] as FlattenedCollection[])
}
type UseCurrentCollectionResult = {
  set: (collectionId: string) => void
  get: () => string | null
}

export function useCurrentCollection(): UseCurrentCollectionResult {
  const COLLECTION_KEY = 'collectionId'

  const set = (collectionId: string) => {
    sessionStorage.setItem(COLLECTION_KEY, collectionId)
  }

  const get = () => {
    return sessionStorage.getItem(COLLECTION_KEY)
  }

  return {
    set,
    get
  }
}
type UseCurrentCollectionResult = {
  set: (collectionId: string) => void
  get: () => string | null
}

export function useCurrentCollection(): UseCurrentCollectionResult {
  const COLLECTION_KEY = 'collectionId'

  const set = (collectionId: string | null) => {
    const isInvalid = collectionId === 'null' || collectionId === null || collectionId === ''
    
    if (isInvalid) {
      sessionStorage.removeItem(COLLECTION_KEY)
    } else {
      sessionStorage.setItem(COLLECTION_KEY, collectionId)
    }
  }

  const get = () => {
    return sessionStorage.getItem(COLLECTION_KEY)
  }

  return {
    set,
    get
  }
}
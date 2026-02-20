import { create } from 'zustand'

interface UploadFile {
  file: File
  preview: string
  title: string
  duration: string
}

type Files = {
  bunnyVideoId: string
  title: string
  signature: string
  expirationTime: number,
  uploadURL: string
  uploadId: string
  slug: string
}

interface UploadStore {
  currentBatch: {
    batchId: string | null
    files: Files[]
    binaries: UploadFile[]
  }
  setBatch: (batchId: string, files: any[], binaries: UploadFile[]) => void
}

export const useUploadStore = create<UploadStore>((set) => ({
  currentBatch: { batchId: null, files: [], binaries: [] },
  setBatch: (batchId, files, binaries) => set({
    currentBatch: { batchId, files, binaries }
  }),
}))
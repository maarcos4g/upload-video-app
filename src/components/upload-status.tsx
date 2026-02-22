interface UploadStatusProps {
  status: string
}

export function UploadStatus({ status }: UploadStatusProps) {

  const statusLabel = {
    completed: "VÁLIDO",
    processing: "PROCESSANDO",
    uploading: "PROCESSANDO",
    cancelled: "ERRO",
    pending: "PENDENTE",
  }

  
  const statusStyles = {
    completed: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    processing: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    uploading: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
  }

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider ${statusStyles[status as keyof typeof statusStyles]}`}>
      {statusLabel[status as keyof typeof statusLabel]}
    </div>
  )
}
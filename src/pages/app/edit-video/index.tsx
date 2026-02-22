import { useParams } from "react-router-dom"

export function EditVideo() {

  const { slug, videoId } = useParams<{ slug: string, videoId: string }>()

  return (
    <>
      <h1>Edit Video: {videoId}</h1>
    </>

  )
}
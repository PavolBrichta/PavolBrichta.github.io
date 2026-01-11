import { useEffect } from 'react'

type Props = {
  image: { name: string; url: string } | null
  onClose: () => void
  previous: () => void
  next: () => void
}

export default function ImageModal({ image, onClose, previous, next }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose]);

  if (!image) return null

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="image-modal">
        <div className="image-modal-previous" onClick={previous}>{"<"}</div>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <img src={image.url} alt={image.name} className="modal-image" />
        <div className="image-modal-next" onClick={next}>{">"}</div>
      </div>
    </>
  )
}

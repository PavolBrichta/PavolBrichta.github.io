import { useMemo, useState } from 'react'
import ImageModal from '../components/ImageModal'

interface GalleryImage {
  name: string
  url: string
}

const GALLERY_IMAGES = [
  '1000004845.jpg',
  '1000004846.jpg',
  '1000004847.jpg',
  '1000005669.jpg',
  '1000005670.jpg',
  '1000005673.jpg',
  '1000005675.jpg',
  '1000005765.jpg',
  '1000005766.jpg',
  '1000005770.jpg',
  '1000005771.jpg',
  '1000005772.jpg',
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const images: GalleryImage[] = useMemo(
    () =>
      GALLERY_IMAGES.map((filename: string) => ({
        name: filename.replace(/\.[^/.]+$/, ''),
        url: `${import.meta.env.BASE_URL}gallery/${filename}`,
      })),
    []
  )

  return (
    <section className="gallery-page">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {images.map((img) => (
          <div
            key={img.name}
            className="gallery-item"
            onClick={() => setSelectedImage(img)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedImage(img)
              }
            }}
          >
            <img src={img.url} alt={img.name} loading="lazy" />
          </div>
        ))}
      </div>

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  )
}

import { useCallback, useEffect, useState } from 'react'

import useEmblaCarousel from 'embla-carousel-react'

import './productSlider.scss'

const images = [
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://basket-15.wbbasket.ru/vol2259/part225918/225918240/images/big/14.webp',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://basket-18.wbbasket.ru/vol3039/part303910/303910061/images/c246x328/3.webp',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://basket-15.wbbasket.ru/vol2259/part225918/225918240/images/big/14.webp',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://basket-15.wbbasket.ru/vol2259/part225918/225918240/images/big/14.webp',
  'https://basket-18.wbbasket.ru/vol3039/part303910/303910061/images/c246x328/2.webp',
  'https://basket-15.wbbasket.ru/vol2259/part225918/225918240/images/big/14.webp',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
]

export function ProductSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [mainRef, mainApi] = useEmblaCarousel({
    watchDrag: false,
    dragFree: false,
    skipSnaps: true,
    loop: false,
  })

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    axis: 'y',
    align: 'start',
    dragFree: false,
    loop: false,
    containScroll: false,
  })

  useEffect(() => {
    if (!mainApi) {
      return
    }
    mainApi.scrollTo(selectedIndex, true)
  }, [selectedIndex, mainApi])

  const goTo = useCallback((i: number) => {
    setSelectedIndex(i)
  }, [])

  const mainPrev = () => setSelectedIndex((i) => Math.max(0, i - 1))

  const mainNext = () =>
    setSelectedIndex((i) => Math.min(images.length - 1, i + 1))

  const thumbsPrev = () => thumbsApi?.scrollPrev()
  const thumbsNext = () => thumbsApi?.scrollNext()

  return (
    <div className="product-slider">
      <div className="product-slider__thumbs">
        <button
          className="thumbs__btn thumbs__btn--prev"
          disabled={!thumbsApi?.canScrollPrev()}
          onClick={thumbsPrev}
        >
          ↑
        </button>

        <div className="thumbs__viewport" ref={thumbsRef}>
          <div className="thumbs__container">
            {images.map((src, i) => (
              <button
                key={i}
                className={`thumbs__slide ${i === selectedIndex ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                onMouseEnter={() => goTo(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <button
          className="thumbs__btn thumbs__btn--next"
          disabled={!thumbsApi?.canScrollNext()}
          onClick={thumbsNext}
        >
          ↓
        </button>
      </div>

      <div className="product-slider__main">
        <button
          className="main__btn main__btn--prev"
          disabled={selectedIndex === 0}
          onClick={mainPrev}
        >
          ←
        </button>

        <div className="main__viewport" ref={mainRef}>
          <div className="main__container">
            {images.map((src, i) => (
              <div className="main__slide" key={i}>
                <img src={src} alt="" className="main__image" />
              </div>
            ))}
          </div>
        </div>

        <button
          className="main__btn main__btn--next"
          disabled={selectedIndex === images.length - 1}
          onClick={mainNext}
        >
          →
        </button>
      </div>
    </div>
  )
}

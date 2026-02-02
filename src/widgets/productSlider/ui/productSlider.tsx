import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import './productSlider.scss'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const images = [
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
  'https://static.galaxystore.ru/upload/resize_cache/iblock/263/440_440_1/hfcqnuzaq7oqw648l7i774rmqb55fv8e.jpg',
]

export function ProductSlider() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Thumbs]}
        direction={'vertical'}
        slidesPerView={'auto'}
        spaceBetween={12}
        navigation={true}
        autoHeight={false}
        watchSlidesProgress={true}
      >
        {images?.map((obj, i) => (
          <SwiperSlide key={i}>
            <img
              src={obj}
              className="rounded-lg select-none h-28!"
              height={112}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

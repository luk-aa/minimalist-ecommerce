import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules'

import 'swiper/css';
import 'swiper/css/free-mode'

import { getNewProds } from '../../api';


export default () => {
  const [slidesPerViev, SetSlidesPerViev] = React.useState(4)
  const [prods, setProds] = useState([])
  const [error, setError] = React.useState()
  React.useEffect(() => {
    async function loadProds() {
      try {
        const data = await getNewProds()
        setProds(data)
      } catch (err) {
        setError(err)
      }
    }

    loadProds()
  }, [])

  const productElements = prods.map(prod => (
    <SwiperSlide key={prod.id}>
      <Link to={`/categories/${prod.id}`} >
        <div key={prod.id} className=' border-2 border-gray-300 hover:border-black'>
          <img src={prod.firstImg} alt="" />
          <div className='p-3'>
            <h3 className='text-lg '>{prod.name}</h3>
            <p className='text-lg font-semibold'>{prod.price}.00$</p>
          </div>
        </div>
      </Link>
    </SwiperSlide>
  ))

  const resize = () => {
    if (window.innerWidth <= 640) {
      SetSlidesPerViev(1.5)
    } else {
      SetSlidesPerViev(4.5)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', resize);
    resize()
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [])

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-10'
      >Trending Now</h2>
      {error && <h1 className='text-xl'>{error}</h1>}
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation
        freeMode={true}
        spaceBetween={20}
        slidesPerView={slidesPerViev}
        className='-mx-5 px-5 lg:-mx-14 lg:px-14'
      >
        <div>
          {productElements}
        </div>
      </Swiper>
    </div>
  );
};
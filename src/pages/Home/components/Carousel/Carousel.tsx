import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import s from './Carousel.module.scss'
import Slider1 from '@/assets/img/slider1.jpg'
import classNames from 'classnames'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import useCreateRoom from '@/hooks/useCreateRoom'

// Тип для пропсов стрелок
interface ArrowProps {
  onClick?: () => void
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div className={classNames(s.arrow, s.arrow_next)} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  )
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div className={classNames(s.arrow, s.arrow_prev)} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  )
}

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  const { createOnlineLobby } = useCreateRoom()

  return (
    <div className={s.wrapper}>
      <div className={s.slider}>
        <Slider {...settings}>
          <div>
            <div className={s.item}>
              <img src={Slider1} alt='' />
              <PlateBtn
                plate='OL'
                text='online lobby'
                url={null}
                handleClick={createOnlineLobby}
                className={s.btn}
              />
            </div>
          </div>
          <div>
            <div className={s.item}>
              <img src={Slider1} alt='' />
              <PlateBtn
                plate='OL'
                text='online lobby'
                url={null}
                handleClick={createOnlineLobby}
                className={s.btn}
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Carousel

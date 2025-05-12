import { React, useRef } from 'react';
import Slider from 'react-slick';
import { StepBack, StepForward } from 'lucide-react';

// Importando os estilos obrigatórios do slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Carrousel({ cards, initialCard, className, afterChange }) {
  const sliderRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  const settings = {
    dots: false,
    infinite: true,
    speed: isMobile ? 500 : 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: isMobile,
    draggable: isMobile,
    initialSlide: initialCard,
    afterChange: index => {
      afterChange?.(index);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className={`${className}`}>
      <Slider ref={sliderRef} {...settings}>
        {cards}
      </Slider>

      <div className="justify-around hidden sm:flex">
        <button className="" onClick={() => sliderRef.current.slickPrev()}>
          <StepBack />
        </button>
        <button className="" onClick={() => sliderRef.current.slickNext()}>
          <StepForward />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TextCarousel = ({ messages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: false,
    };

    return (
        <div style={{ width: '100%', height: '10%', position: 'relative', zIndex: 2 }}>
            <Slider {...settings}>
                {messages.map((message, index) => (
                    <div key={index}>
                        {message}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TextCarousel;

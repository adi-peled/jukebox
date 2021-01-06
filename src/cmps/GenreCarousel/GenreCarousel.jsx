import React from 'react'
import Carousel from 'react-multi-carousel';
import './GenreCarousel.scss'
import { NavLink, useHistory, Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css';

export default function ImgCarousel({ genres }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items:7,
      slidesToSlide: 1// optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 750 },
      items: 5,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 750, min: 0 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <div className="genreCarousel">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass=""
      renderDotsOutside={true}
      >

        {genres.map(genre => {
          return <Link className="genreCarousel__link" onClick={() => console.log('clicked')} to={'/main/' + genre}> {genre}</Link>
        })}
      </Carousel>

    </div>
  )
}

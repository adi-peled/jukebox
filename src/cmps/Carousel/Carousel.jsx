import React from 'react'
import Carousel from 'react-multi-carousel';
import './Carousel.scss'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css';

export default function AppCarousel({ genres }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
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
    <div className="carousel">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // dotListClass="custom-dot-list-style"
        itemClass=""
        showDots={false}
        renderDotsOutside={false}
      >

        {genres.map(genre => {
          return <Link key={genre} to={'/main/' + genre}> {genre}</Link>
        })}
      </Carousel>

    </div>
  )
}

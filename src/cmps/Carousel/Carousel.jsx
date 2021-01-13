import React from 'react'
import Carousel from 'react-multi-carousel';
import './Carousel.scss'
import { Link } from 'react-router-dom'
import BoxPreview from '../BoxPreview/BoxPreview'

import 'react-multi-carousel/lib/styles.css';

export default function AppCarousel({ items }) {
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

  const isObject = typeof (items[0]) === 'object'

  return (
  
      <Carousel
        className={isObject ? '' : 'links-container'}
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

        {items && !(isObject) && items.map(item => {
          return <Link className="link" key={item} to={'/main/' + item}> {item}</Link>
        })}

        {items && isObject && items.map(item => {
          return <BoxPreview key={item._id} box={item} />
        })}
      </Carousel>
  )
}

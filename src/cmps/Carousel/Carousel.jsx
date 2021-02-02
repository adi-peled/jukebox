import React from 'react'
import Carousel from 'react-multi-carousel';
import './Carousel.scss'
import { Link } from 'react-router-dom'
import BoxPreview from '../BoxPreview/BoxPreview'

import 'react-multi-carousel/lib/styles.css';

export default function AppCarousel({ items, heroImgs }) {
  const responsive = {
    largeDesktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: heroImgs ? 1 : 7,
      slidesToSlide: 1// optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: heroImgs ? 1 : 6,
      slidesToSlide: 1// optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 750 },
      items: heroImgs ? 1 : 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 750, min: 0 },
      items: heroImgs ? 1 : 3,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const isObject = typeof (items[0]) === 'object'

  return (

    <Carousel
      className={isObject || heroImgs ? '' : 'links-container'}
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      infinite={true}
      autoPlaySpeed={2000}
      keyBoardControl={false}
      customTransition="all .5s"
      transitionDuration={500}
      containerClass="carousel-container"
      // dotListClass="custom-dot-list-style"
      itemClass=""
      showDots={false}
      renderDotsOutside={false}
      autoPlay={heroImgs ? true : false}
      arrows={heroImgs ? false : true}
    >

      {!heroImgs && items && !(isObject) && items.map(item => {
        const path = item === 'All' ? '' : item
        return <Link className="link" key={item} to={'/main/' + path}> {item}</Link>
      })}

      {!heroImgs && items && isObject && items.map(item => {
        return <BoxPreview key={item._id} box={item} />
      })}


      {heroImgs && items.map(item => {
        return <img key={item} className="home__img" src={item} />
      })}

    </Carousel>
  )
}

import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({movieDetails}) => {
  const {poster_path} = movieDetails
  
  return (
    poster_path && (
    <div className='w-28 md:w-48 pr-1 md:pr-2'>
      <img src={IMG_CDN_URL + poster_path} alt="movie" />
    </div>
    )
  )
}

export default MovieCard
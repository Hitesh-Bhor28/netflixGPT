import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({movieDetails}) => {
  const {poster_path} = movieDetails
  if(!poster_path) return null;
  return (
    <div className='w-48 pr-4'>
      <img src={IMG_CDN_URL + poster_path} alt="movie" />
    </div>
  )
}

export default MovieCard
import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { Netflix_Bg_Img } from '../utils/constants'

const GptSearchPage = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img className='w-screen h-screen object-cover' src={Netflix_Bg_Img} alt="bg_img" />
      </div>
      <div className=''>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearchPage
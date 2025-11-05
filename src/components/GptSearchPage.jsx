import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { Netflix_Bg_Img } from '../utils/constants'

const GptSearchPage = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className='h-screen md:w-screen md:h-screen object-cover' src={Netflix_Bg_Img} alt="bg_img" />
      </div>
      <div className='py-[30%] md:py-0'>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearchPage
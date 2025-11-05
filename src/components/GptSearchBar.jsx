import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lang } from '../utils/languageConstants'; 
import { options } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchBox = useRef();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const searchMovieTMDB = async (movie)=>{
    const url = "https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1";
    const data = await fetch(url, options)

    const dataJson = await data.json()
    return dataJson.results
  }
 

  const handleGptSearchClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchBox.current.value}. Only Give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Transformers`;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gemini`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We send the gptQuery in the 'prompt' field
        // to match what your server expects (req.body.prompt)
        body: JSON.stringify({ prompt: gptQuery }),
      });

      if (!response.ok) {
        // Handle any errors from your server
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const data = await response.json();

      // This is the text from Gemini
      // console.log(data.text);
      const gptMovies = data.text.split(",")

      const promisedArray = gptMovies.map(movie => searchMovieTMDB(movie))
      // [Promise, Promise, Promise, Promise, Promise, ]
      const tmdbResults = await Promise.all(promisedArray)

      console.log(tmdbResults)
      dispatch(addGptMovieResult({movieNames: gptMovies,movieResults: tmdbResults}))

    } catch (err) {
      console.error('Error:', err);
      alert('Too many requests — please wait a few seconds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[9%] flex justify-center">
      <form onSubmit={(e) => e.preventDefault()} className="w-2/2 md:w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          ref={searchBox}
          className="text-sm text-black p-4 m-4 col-span-9 bg-white placeholder:text-gray-700 placeholder:text-sm"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 md:py-2 md:px-4 bg-red-700 text-white text-sm md:text-lg rounded-lg"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? 'Wait' : lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { lang } from '../utils/languageConstants'; 
import { BACKEND_URL } from '../utils/constants';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchBox = useRef();
  const [loading, setLoading] = useState(false);
 

  const handleGptSearchClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchBox.current.value}. Only Give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Transformers`;

      const response = await fetch(`${BACKEND_URL}/api/gemini`, {
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
      console.log(data.text);

    } catch (err) {
      console.error('Error:', err);
      alert('Too many requests — please wait a few seconds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form onSubmit={(e) => e.preventDefault()} className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          ref={searchBox}
          className="text-black p-4 m-4 col-span-9 bg-white placeholder:text-gray-700"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
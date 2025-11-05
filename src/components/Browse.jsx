import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import { useSelector } from 'react-redux';
import GptSearchPage from './GptSearchPage';

const Browse = () => {
  useNowPlayingMovies()
  usePopularMovies()
  useUpcomingMovies()
  useTopRatedMovies()

  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);
   
  return (
    <div className=''>
      <Header />
      {
        showGptSearch ? <GptSearchPage /> : (
          <>
          <MainContainer /><SecondaryContainer />
          </>
        )
      }
    </div>
  )
}

export default Browse
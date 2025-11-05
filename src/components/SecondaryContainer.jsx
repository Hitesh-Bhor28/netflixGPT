import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);
  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);

  return (
    nowPlayingMovies && (
      <div className="bg-black">
      <div className="bg-black w-full">
        <div className="-mt-[-40%] md:mt-[-18%] pl-2 md:pl-6 relative z-20 ">
          <MovieList title={'Now Playing'} movies={nowPlayingMovies} />
          <MovieList title={'Popular'} movies={popularMovies} />
          <MovieList title={'Upcoming'} movies={upcomingMovies} />
          <MovieList title={'Top Rated'} movies={topRatedMovies} />
        </div>
      </div>
      </div>
    )
  );
};

export default SecondaryContainer;

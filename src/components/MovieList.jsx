import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  return (
    <div className="px-2 my-7 md:my-4">
      <h1 className="text-sm md:text-3xl py-2 text-white">{title}</h1>

      <div className="flex overflow-x-auto hide-scrollbar scroll-smooth snap-x">
        <div className="flex space-x-4">
          {movies
            ?.filter((movie) => movie.poster_path) //only keep movies with poster
            .map((movie) => (
              <div
                key={movie.id}
                className="snap-start flex-none transition-transform duration-300 hover:scale-105"
              >
                <MovieCard movieDetails={movie} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

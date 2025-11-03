import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

    return (
        <div className="px-7">
            <h1 className="text-3xl py-2 text-white">{title}</h1>
            <div className="flex overflow-x-auto hide-scrollbar scroll-smooth snap-x">
                <div className="flex space-x-4">
                    {movies?.map((movie) => (
                        <div key={movie.id} className="snap-start flex-none transition-transform duration-300 hover:scale-105">
                            <MovieCard movieDetails={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default MovieList;

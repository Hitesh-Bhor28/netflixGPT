import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
    console.log(movies);

    return (
        <div className="px-7">
            <h1 className="text-3xl py-2 text-white">{title}</h1>
            <div className="flex overflow-x-scroll">
                <div className="flex">
                    {movies && movies.map((movie) =>  (
                            <MovieCard key={movie.id} movieDetails={movie} />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieList;

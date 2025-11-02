import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies)
    // Early return because at loading movies[0] will null. 
    // if(!movies) return;
    if(movies === null) return;

    const mainMovie = movies[0]
    const {id, original_title, overview} = mainMovie
    return (
        <div>
            <VideoTitle title={original_title} overview={overview}/>
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer;
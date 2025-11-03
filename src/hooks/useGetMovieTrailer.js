import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useGetMovieTrailer = (movieId)=>{
    const dispatch = useDispatch()
 
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

    useEffect(() => {
        getMovieVideo();
    }, [])

    const getMovieVideo = async () => {
        const videos = await fetch(url, options);
        const videosJson = await videos.json()

        const filterTrailers = videosJson.results.filter((video) => video.type === "Trailer")

        const trailer = filterTrailers.length <= 0 ? videosJson.results[0] : filterTrailers[0]
        
        dispatch(addTrailerVideo(trailer))
    }
 
}

export default useGetMovieTrailer;
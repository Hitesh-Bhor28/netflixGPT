import { useSelector } from "react-redux";
import useGetMovieTrailer from "../hooks/useGetMovieTrailer";

const VideoBackground = ({ movieId }) => {
   useGetMovieTrailer(movieId);
  
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo)
  const trailerKey = trailerVideo?.key
  return (
    <div className="w-screen">
      <iframe className="w-screen aspect-video"
        src={`https://wxcom/embed/${trailerKey}?&autoplay=1&mute=1`}
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        >
      </iframe>
    </div>
  )
}

export default VideoBackground;
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNowPlayingMovies } from "../utils/movieSlice";
import { NOW_PLAYING_URL, options } from "../utils/constants";

const useNowPlayingMovies = () => {
  //Fetch data and Update Store
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store)=> store.movies.nowPlayingMovies)

  const getNowPlayingMovies = async () => {

    const data = await fetch(NOW_PLAYING_URL, options)
    const dataJson = await data.json() 

    dispatch(addNowPlayingMovies(dataJson.results))
  }

  useEffect(() => {
    //Memoization concept
    if(!nowPlayingMovies) getNowPlayingMovies()
  }, [])

}

export default useNowPlayingMovies;
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addNowPlayingMovies } from "../utils/movieSlice";
import { NOW_PLAYING_URL, options } from "../utils/constants";

const useNowPlayingMovies = () => {
  //Fetch data and Update Store
  const dispatch = useDispatch();

  useEffect(() => {
    getNowPlayingMovies()
  }, [])

  const getNowPlayingMovies = async () => {

    const data = await fetch(NOW_PLAYING_URL, options)
    const dataJson = await data.json() 

    dispatch(addNowPlayingMovies(dataJson.results))
  }
}

export default useNowPlayingMovies;
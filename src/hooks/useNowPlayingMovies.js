import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addNowPlayingMovies } from "../utils/movieSlice";
import { options } from "../utils/constants";

const useNowPlayingMovies = () => {
  //Fetch data and Update Store
  const dispatch = useDispatch();

  useEffect(() => {
    getNowPlayingMovies()
  }, [])

  const getNowPlayingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
    const data = await fetch(url, options)
    const dataJson = await data.json() 

    dispatch(addNowPlayingMovies(dataJson.results))
  }
}

export default useNowPlayingMovies;
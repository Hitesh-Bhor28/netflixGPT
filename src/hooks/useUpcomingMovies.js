import { useEffect } from "react";
import { options, UPCOMING } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = ()=>{
    const dispatch = useDispatch()
    const upcomingMovies = useSelector((store)=> store.movies.upcomingMovies)
    
    useEffect(() => {
    //Memoization concept
    if(!upcomingMovies) getUpcomingMovies()
  }, [])

    const getUpcomingMovies =  async ()=>{

        const data = await fetch(UPCOMING, options);
        const dataJson = await data.json();

        dispatch(addUpcomingMovies(dataJson.results));
    }
}

export default useUpcomingMovies;
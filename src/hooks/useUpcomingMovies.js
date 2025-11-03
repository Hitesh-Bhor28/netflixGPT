import { useEffect } from "react";
import { options, UPCOMING } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = ()=>{
    const dispatch = useDispatch()
    
    useEffect(()=>{
        getUpcomingMovies();
    },[])

    const getUpcomingMovies =  async ()=>{

        const data = await fetch(UPCOMING, options);
        const dataJson = await data.json();

        dispatch(addUpcomingMovies(dataJson.results));
    }
}

export default useUpcomingMovies;
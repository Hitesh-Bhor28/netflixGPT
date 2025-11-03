import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { options, POPULAR_URL } from "../utils/constants";

const usePopularMovies = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        getPopularMovies()
    },[])

    const getPopularMovies = async () =>{
        
        const data = await fetch(POPULAR_URL,options);
        const dataJson = await data.json() 
        
        dispatch(addPopularMovies(dataJson.results));
    }
}

export default usePopularMovies;
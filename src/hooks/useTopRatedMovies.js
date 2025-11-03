import { useEffect } from "react";
import { options, TOP_RATED } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = ()=>{
    const dispatch = useDispatch()
    
    useEffect(()=>{
        getTopRatedMovies();
    },[])

    const getTopRatedMovies =  async ()=>{

        const data = await fetch(TOP_RATED, options);
        const dataJson = await data.json();

        dispatch(addTopRatedMovies(dataJson.results));
    }
}

export default useTopRatedMovies;
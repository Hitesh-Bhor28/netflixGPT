import { useEffect } from "react";
import { options, TOP_RATED } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
    const dispatch = useDispatch()
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)

    useEffect(() => {
        //Memoization concept
        if (!topRatedMovies) getTopRatedMovies()
    }, [])

    const getTopRatedMovies = async () => {

        const data = await fetch(TOP_RATED, options);
        const dataJson = await data.json();

        dispatch(addTopRatedMovies(dataJson.results));
    }
}

export default useTopRatedMovies;
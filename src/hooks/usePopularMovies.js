import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { options, POPULAR_URL } from "../utils/constants";

const usePopularMovies = () => {
    const dispatch = useDispatch()
    const popularMovies = useSelector((store) => store.movies.popularMovies)


    const getPopularMovies = async () => {
        const data = await fetch(POPULAR_URL, options);
        const dataJson = await data.json()

        dispatch(addPopularMovies(dataJson.results));
    }

    useEffect(() => {
        //Memoization concept
        if (!popularMovies) getPopularMovies()
    }, [])
}

export default usePopularMovies;
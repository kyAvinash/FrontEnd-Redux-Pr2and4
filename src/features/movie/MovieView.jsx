import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./moviesSlice";
import MovieList from "./MovieList";

const MovieView = () => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <>
      <h2 className="mt-4">Available Movies</h2>
      <div>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error:{error}</p>}
        {status === "success" && <MovieList movies={movies} />}
      </div>
    </>
  );
};
export default MovieView;

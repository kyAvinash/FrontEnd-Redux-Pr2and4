import { useDispatch } from "react-redux";
import { deleteMovieAsync } from "./moviesSlice";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteMovieAsync(id));
  };
  return (
    <>
      {movies.length === 0 ? (
        <p className="text-muted mt-3">
          No Movies available. Please add a new Movie.
        </p>
      ) : (
        <ul className="list-group mt-3">
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{movie.movieTitle}</strong>
                <br />
                <span className="text-muted">Director: {movie.director}</span>
                <br />
                <span className="text-muted">Genre: {movie.genre}</span>
                <br />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>{" "}
                <Link to="/addMovie" state={{movie}} className="btn btn-warning btn-sm">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieList;

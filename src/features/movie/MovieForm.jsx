import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMovieAsync, updateMovieAsync } from "./moviesSlice";
import { useLocation } from "react-router-dom";

const MovieForm = () => {
  const dispatch = useDispatch();
  const [movieTitle, setMovieTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const location = useLocation();
  const { movie } = location.state || {};

  useEffect(() => {
    if (movie) {
      setIsEditing(true);
      setMovieTitle(movie.movieTitle);
      setDirector(movie.director);
      setGenre(movie.genre);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = { movieTitle, director, genre };

    if (movie) {
      dispatch(updateMovieAsync({ id: movie._id, updatedMovie: newMovie }));
      setSuccess("Movie Updated Successfully");
    } else {
      dispatch(addMovieAsync(newMovie));
      setSuccess("Movie Added Successfully!!");
    }

    setMovieTitle("");
    setDirector("");
    setGenre("");
    setTimeout(() => setSuccess(null), 5000);
  };
  return (
    <>
      <h2>{isEditing ? "Update Movie Data" : "Add Movie Data"}</h2>
      {/* Success Message */}
      {success && (
        <div className="alert alert-success mt-3" role="alert">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label" htmlFor="movieTitle">
            Movie Title
          </label>
          <input
            id="movieTitle"
            type="text"
            className="form-control"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="director">
            Director
          </label>
          <input
            type="text"
            className="form-control"
            value={director}
            id="director"
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="genre">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            value={genre}
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
        {isEditing ? "Update Movie" : "Add Movie"}
        </button>
      </form>
    </>
  );
};

export default MovieForm;

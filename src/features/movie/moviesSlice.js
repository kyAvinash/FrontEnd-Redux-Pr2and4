import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(
    "https://redux-practice-backend.vercel.app/movies"
  );
  return response.data;
});

export const addMovieAsync = createAsyncThunk(
  "movies/addMovie",
  async (newMovie) => {
    const response = await axios.post(
      "https://redux-practice-backend.vercel.app/movies",
      newMovie
    );
    return response.data;
  }
);

export const deleteMovieAsync = createAsyncThunk(
  "movie/deleteMovie",
  async (id) => {
    await axios.delete(
      `https://redux-practice-backend.vercel.app/movies/${id}`
    );
    return id;
  }
);

export const updateMovieAsync = createAsyncThunk(
  "movie/updateMovie",
  async ({ id, updatedMovie }) => {
    const response = await axios.put(
      `https://redux-practice-backend.vercel.app/movies/${id}`,
      updatedMovie
    );
    return response.data;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "success";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addMovieAsync.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovieAsync.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload.id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        );
      });
  },
});

export default moviesSlice.reducer;

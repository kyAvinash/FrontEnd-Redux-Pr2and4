import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "../features/movie/moviesSlice";

export default configureStore({
  reducer: {
    movies: moviesSlice.reducer,
  },
});

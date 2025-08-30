import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movieTrailer: null,
    nowPlayingMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    topRatedMovies: null,
  },
  reducers: {
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addMovieTrailer,
  addPopularMovies,
  addUpcomingMovies,
  addTopRatedMovies,
} = movieSlice.actions;
export default movieSlice.reducer;

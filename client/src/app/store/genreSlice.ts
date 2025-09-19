import { createSlice, type Dispatch } from "@reduxjs/toolkit";
import genreService from "../services/genre.service.ts";
import isOutdated from "../utils/isOutdated.ts";
import type { RootState } from "./store.ts";

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    genresRequested: (state) => {
      state.isLoading = true;
    },
    genresReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    genresRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: genresReducer, actions } = genresSlice;
const { genresRequested, genresReceved, genresRequestFailed } = actions;

export const loadGenresList = () => async (dispatch: Dispatch, getState) => {
  const { lastFetch } = getState().genres;
  if (isOutdated(lastFetch)) {
    dispatch(genresRequested());
    try {
      const content = await genreService.fetchAll();
      dispatch(genresReceved(content));
    } catch (error: any) {
      dispatch(genresRequestFailed(error.message));
    }
  }
};

export const getGenres = () => (state: RootState) => state.genres.entities;
export const getGenresLoadingStatus = () => (state: RootState) =>
  state.genres.isLoading;
export const getGenresByIds = (genresIds: string[]) => (state: RootState) => {
  if (state.genres.entities) {
    const genresArray = [];
    for (const genreId of genresIds) {
      for (const genre of state.genres.entities) {
        if (genre._id === genreId) {
          genresArray.push(genre);
          break;
        }
      }
    }
    return genresArray;
  }
  return [];
};

export default genresReducer;

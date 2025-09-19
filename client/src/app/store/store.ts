import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import genresReducer from "./genreSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    genres: genresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

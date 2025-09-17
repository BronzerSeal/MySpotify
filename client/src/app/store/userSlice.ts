import { createAction, createSlice, type Dispatch } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import authService from "../services/auth.service";
import type { NavigateFunction } from "react-router-dom";
import generateAuthError from "../utils/generateAuthError";
import type { RootState } from "./store";
import userService from "../services/user.service";

type loginPayload = {
  email: string;
  password: string;
  stayOn: boolean;
};

const initialState = localStorageService.getAccessToken()
  ? {
      entity: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entity: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userReceved: (state, action) => {
      state.entity = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    userRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.entity = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entity = action.payload;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  userRequested,
  userReceved,
  userRequestFiled,
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  userUpdateSuccessed,
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const login =
  ({
    payload,
    redirect,
    navigate,
  }: {
    payload: loginPayload;
    redirect: string;
    navigate: NavigateFunction;
  }) =>
  async (dispatch: Dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);

      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate(redirect);
    } catch (error: any) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp =
  (payload: any, redirect: string, navigate: NavigateFunction) =>
  async (dispatch: Dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register(payload);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate(redirect);
    } catch (error: any) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const logOut =
  (redirect: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    navigate(redirect);
  };

export const loadUserList = () => async (dispatch: Dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await userService.getCurrentUser();
    dispatch(userReceved(content));
  } catch (error: any) {
    dispatch(userRequestFiled(error.message));
  }
};

export const updateUser =
  (payload, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    dispatch(userUpdateRequested());
    try {
      const { content } = await userService.update(payload);
      dispatch(userUpdateSuccessed(content));
      navigate(`/users/${content._id}`);
    } catch (error: any) {
      dispatch(userUpdateFailed(error.message));
    }
  };

export const getCurrentUserData = () => (state: RootState) => {
  return state.users.entity ?? null;
};

export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getDataStatus = () => (state: RootState) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state: RootState) =>
  state.users.isLoading;
export const getCurrentUserId = () => (state: RootState) => {
  state.users.auth ? state.users.auth.userId : null;
};

export const getAuthErrors = () => (state: RootState) => state.users.error;
export default usersReducer;

import type { AppDispatch } from "@/app/store/store";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUserList,
} from "@/app/store/userSlice";
import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppLoader = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserList());
    }
  }, [isLoggedIn]);

  if (userStatusLoading) return "loading";
  return children;
};

export default AppLoader;

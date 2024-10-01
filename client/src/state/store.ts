"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./api";
import globalReducer from "./features/global";

// REDUX STORE

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});
export const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => {
      return getDefault().concat(api.middleware);
    },
  });
};

//REDUX TYPES
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

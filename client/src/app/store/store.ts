import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import counterReducer, { counterSlice } from "../../features/contact/counterReducer";
import { useDispatch, useSelector } from 'react-redux'
import { catalogApi } from "../../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import  { errorApi } from "../../features/about/errorApi";
//import type { AppDispatch, RootState } from './store'

export function configureTheStore(){
    //configure and return the store
    return legacy_createStore(counterReducer)
}

export const store = configureStore({
    reducer:{
        [catalogApi.reducerPath]: catalogApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        counter: counterSlice.reducer,
        ui:uiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) =>
getDefaultMiddleware().concat(catalogApi.middleware, errorApi.middleware),
});
/* middleware because is responsible for handling the API request##:It intercepts dispatched actions related to 
queries and it initiates the fetching process, helps us with caching and cache invalidation.
It all happens automagically.
We don't need to configure caching.It's going to cache the data for us by itself, and we'll see that very soon in action.
And it also helps us capture and handle errors from our API responses.So we just add the middleware from our catalog API.     */


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
import { legacy_createStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/contact/counterReducer";

export function configureTheStore(){
    //configure and return the store
    return legacy_createStore(counterReducer)
}
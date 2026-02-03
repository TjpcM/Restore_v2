import { createSlice } from "@reduxjs/toolkit";
const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem('darkMode');
  return storedDarkMode ? JSON.parse(storedDarkMode) : true;
}
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        darkMode: getInitialDarkMode()
    },
    reducers: {
        //sets isLoading to true
        startLoading: (state) => {
            state.isLoading = true;
        },
        //sets isLoading to false
        stopLoading: (state) => {
            state.isLoading = false;
        },
        setDarkMode: (state)=> {
             localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
             state.darkMode = !state.darkMode;
          }
    }
});

export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;
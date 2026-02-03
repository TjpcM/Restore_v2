import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api'
});

// resolve after 1 second that is used to simulate loading delay throughout the app
// promise is used to wait for the delay to finish
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args:string | FetchArgs, api:BaseQueryApi, extraOptions:object) => {
    api.dispatch(startLoading);
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading())
    if(result.error){
        const {status, data} = result.error;

      console.error('Error occurred during API request:', result.error);
      console.log(status, data);
    }

    return result;
}
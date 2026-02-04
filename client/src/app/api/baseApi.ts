import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { router } from "../routes/Routes";


type ErrorResponse = |string | {title: string} | {errors:string[]};
const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api'
});

// resolve after 1 second that is used to simulate loading delay throughout the app
// promise is used to wait for the delay to finish
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args:string | FetchArgs, api:BaseQueryApi, extraOptions:object) => {
    api.dispatch(startLoading());
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading())

    if(result.error){
        const originalStatus = result.error.status ==='PARSING_ERROR' && result.error.originalStatus 
                                  ? result.error.originalStatus 
                                  : result.error.status;  
        const responseData = result.error.data as ErrorResponse;

        //const {status, data} = originalStatus;
        switch(originalStatus){
            case 400:
                 if (typeof responseData === 'string')toast.error(responseData);
                 else if ('errors' in responseData){
                   throw Object.values(responseData.errors).flat().join(', ');  
                 }
                 else toast.error(responseData.title);

                break; 
            case 401:
                if (typeof responseData === 'object' && responseData !== null && 'title' in responseData) {
                    toast.error(responseData.title  );}
                break;
            case 404:
                if (typeof responseData === 'object' && responseData !== null && 'title' in responseData) {
                    router.navigate('/not-found'); //navigate to NotFound page
                }
                break;
            case 500:
                if (typeof responseData === 'object' ) {
                    router.navigate('/server-error',{state:{error:responseData}});//navigate to ServerError page with error details
                                                                                    //  in state
                }
                    break;
            default:
                break;
        }
    }

    return result;
}
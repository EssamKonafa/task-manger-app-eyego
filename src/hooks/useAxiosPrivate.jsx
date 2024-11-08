import { instancePrivate, refreshToken } from "@/API/httpClient";
import useUserStore from "@/Stores/AuthStore";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const { userInfo } = useUserStore();  
    const refresh = useRefreshToken(); 

    useEffect(() => {
        //interceptors here i'm using to send with request|response user id - auth before the req - res reaching the api server

        const requestIntercept = instancePrivate.interceptors.request.use(
            (config) => {

                if (!config.headers['Authorization'] && userInfo?.accessToken) {
                    config.headers['Authorization'] = `Bearer ${userInfo.accessToken}`;
                }
                if (userInfo?.userId) {
                    config.headers['id'] = userInfo.userId;
                }

                return config;  
            },
            (error) => Promise.reject(error) 
        );

        const responseIntercept = instancePrivate.interceptors.response.use(
            (response) => {

                delete response.headers['Authorization'];
                delete response.config.headers['Authorization'];
                return response;  
            },

            async (error) => {
                const prevRequest = error?.config; 
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true; 

                    try {

                        const { accessToken } = await refresh();
                        
                        prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        prevRequest.headers['id'] = userInfo.userId; 

                        return instancePrivate(prevRequest);
                    } catch (error) {

                        console.error("Error refreshing token:", error);
                        return Promise.reject(error);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            instancePrivate.interceptors.request.eject(requestIntercept);
            instancePrivate.interceptors.response.eject(responseIntercept);
        };
    }, [userInfo, refresh]);

    return instancePrivate;
};

export default useAxiosPrivate;
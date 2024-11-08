'use client'
import { refreshToken } from "@/API/httpClient";
import useRefreshToken from "@/hooks/useRefreshToken";
import useUserStore from "@/Stores/AuthStore";
import { useEffect, useState } from "react";

const AuthPersistProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const { userInfo } = useUserStore();
    const refresh = useRefreshToken()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.error("Error verifying refresh token:", error);

            } finally {
                setIsLoading(false)
            }
        }
        if (!userInfo?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [userInfo?.accessToken, refresh]); 

    return <>{children}</>
}

export default AuthPersistProvider;
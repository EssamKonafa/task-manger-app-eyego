// 'use client'
// import useRefreshToken from "@/hooks/useRefreshToken";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const AuthPersistProvider = ({ children }) => {

//     const [isLoading, setIsLoading] = useState(true)
//     const refresh = useRefreshToken()
//     const router = useRouter()
//     const { userInfo } = useUserStore();

//     useEffect(() => {
//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh()
//             } catch (error) {
//                 console.error(error);

//             } finally {
//                 setIsLoading(false)
//             }
//         }
//         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
//     }, [])

//     return <>{children}</>
// }

// export default AuthPersistProvider;
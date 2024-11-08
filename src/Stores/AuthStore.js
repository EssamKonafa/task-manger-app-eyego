import { create } from 'zustand'

//global state for setting user info and auth status 
const useUserStore = create((set) => ({
    isAuthenticated: false,
    userInfo: null,
    setUserStore: (userInfo,status) => set({ userInfo, isAuthenticated:true }),
    removeUserStatus: () => set({ userInfo: null, isAuthenticated: false, }),
}))

export default useUserStore;
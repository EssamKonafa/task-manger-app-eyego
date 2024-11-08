import { instance } from "@/API/httpClient";
import useUserStore from "@/Stores/AuthStore";

const useRefreshToken = () => {
    const { setUserStore } = useUserStore();

    const refresh = async () => {
        try {
            const response = await instance.post('/user/refresh-token', {});
            setUserStore((prevState) => {
                console.log('New Access state: ', response.data);
                return { ...prevState, userId: response.data.userId };
            });
            return response.data;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; 
        }
    };

    return refresh;
};

export default useRefreshToken;
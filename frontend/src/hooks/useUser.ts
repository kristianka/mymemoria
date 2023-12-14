import { useQuery } from "@tanstack/react-query";
import { FireBaseUserInterface } from "../types";
import userService from "../services/user";

const useUser = (firebaseAuth: FireBaseUserInterface | null) => {
    return useQuery({
        queryKey: ["user", firebaseAuth],
        enabled: !!firebaseAuth,
        queryFn: () => {
            const cachedUserData = localStorage.getItem("userData");
            if (!cachedUserData) {
                const fetchData = async () => {
                    const user = await userService.getUser();
                    // not to be used for validation, just for caching to avoid flickering
                    localStorage.setItem("userData", JSON.stringify(user));
                    return user;
                };
                return fetchData();
            }
            return JSON.parse(cachedUserData);
        }
    });
};

export default useUser;

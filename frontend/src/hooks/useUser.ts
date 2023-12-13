import { useQuery } from "@tanstack/react-query";
import userService from "../services/user";

const useUser = (firebaseAuth: object | null) => {
    return useQuery({
        queryKey: ["user", firebaseAuth],
        enabled: !!firebaseAuth,
        queryFn: () => {
            console.log("RUNNING USERQUERY! FIREBASEAUTH", firebaseAuth);
            const cachedUserData = localStorage.getItem("userData");
            console.log("cached userdata", cachedUserData);
            if (!cachedUserData) {
                const fetchData = async () => {
                    const user = await userService.getAll();
                    // not to be used for validation, just for caching to avoid flickering
                    localStorage.setItem("userData", JSON.stringify(user));
                    console.log("returning user data from useuser hook", user);
                    return user;
                };
                return fetchData();
            }
            return JSON.parse(cachedUserData);
        }
    });
};

export default useUser;

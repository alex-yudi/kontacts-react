import { createContext } from "react";
import useUserProvider from '../hooks/useUserProvider';

const UserContext = createContext({});

export function UserProvider({ children }) {

    const userProvider = useUserProvider()

    return (
        <UserContext.Provider value={userProvider}>

            {children}

        </UserContext.Provider>
    )
}

export default UserContext;
import React from 'react';

type User = {
    id?: String,
};
type AuthState = {
    user?: User
};
type ContextData = {
    user?: AuthState,
    login?: () => Promise<void>,
    logout?: () => Promise<void>
};

export const UserContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const UserProvider = (props: Props) => {
    const [user, setUser] = React.useState({});

    const logout = React.useCallback(() => {
        setUser({});
    }, []);

    const login = (id: String) => {
        // TODO: call to server
        const test: Function = () => new Promise((resolve) => {
            console.log(`User connected: ${id}`);
            resolve({ id });
        });
        
        return test().then((response: User) => {
            setUser(response);
            return response;
        });
    };

    // can be used for initial lookup on site load
    React.useEffect(() => {
        const fetchUser = () => {
            return new Promise((resolve) => {
                resolve({ id: 'GuestUser' });
            });
        }
    }, []);

    const contextValue = React.useMemo(() => ({
        user,
        login,
        logout
    }), [user, logout, login])

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;

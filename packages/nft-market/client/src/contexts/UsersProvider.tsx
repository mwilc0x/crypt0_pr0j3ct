import React from 'react';
import { getUsers } from '../utils/api';

export const UsersContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const UserProvider = (props: Props) => {
    const [users, setUsers] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        const setup = async () => {
            const users = await getUsers();
            console.log('users!?', users);
            setUsers(users);
        }
        setup();
    }, []);

    const contextValue = React.useMemo(() => ({
        users
    }), [users]);

    return (
        <UsersContext.Provider value={contextValue}>
            {props.children}
        </UsersContext.Provider>
    );
}

export default UserProvider;

import React from 'react';
import { UserContext } from '../../contexts/UserProvider';

type Props = {
    handleClickFromParent?: () => void
};
const LogoutButton = (props: Props) => {
    const { user } = React.useContext(UserContext);
    return (<>{!!user.id ? <button onClick={props.handleClickFromParent}>Logout</button> : null }</>);
}

export default LogoutButton;

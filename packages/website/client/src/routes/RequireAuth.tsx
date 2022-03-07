import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';

type Props = { children: JSX.Element };
function RequireAuth({ children }: Props) {
    const { user } = React.useContext(UserContext);
    console.log(user)
  
    return !!user.id
      ? children
      : <Navigate to="/login" replace />;
}

export default RequireAuth;

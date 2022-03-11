import React from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserProvider';
import UserInputForm from '../../components/UserInputForm';
import './style.scss';

const Login = () => {
  const navigate = useNavigate();
  const {login} = React.useContext(UserContext);

  const handleLogin = (input: String) => {
    login(input).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="page">
      <div>
        <form className="login-form">
          <p>Please sign-in</p>
          <div className="login-form-inputs">
            <UserInputForm handleSubmitFromParent={handleLogin} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

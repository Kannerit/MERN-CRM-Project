import "./login.css"
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  return (
    <div className="login">
      {props.user ? <Navigate to="/" /> : <LoginForm />}
    </div>
  );
};

export default Login;

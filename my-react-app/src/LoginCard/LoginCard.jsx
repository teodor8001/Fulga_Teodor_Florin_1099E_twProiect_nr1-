import icon from '../assets/Logo_TW.webp'
import UserAnPass from './UserAnPass';

const LoginCard = () => {
    return (
      <div className="login-card">
        <img className="logo-card" src={icon}></img>
        <UserAnPass></UserAnPass>
        <button className="button-card">Log in</button>
        <text>Don't have an account? </text>
        <a href="/register" className="register-text">Sign up</a>
      </div>
    );
  };

export default LoginCard;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import de useNavigate pour la redirection
import Image from "../assets/1.png";
import Logo from "../assets/1.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css"; // Fichier CSS propre à Login
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook pour la redirection

  const handleSuccess = (response) => {
    console.log("Connexion réussie :", response);
    // Redirection vers Dashboard après connexion réussie
    navigate("/dashboard");
  };

  const handleError = () => {
    console.log("La connexion a échoué");
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Login" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Welcome back</h2>
            <p>Please enter your details</p>
            <form>
              <input type="email" placeholder="Email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">Remember me</label>
                </div>
              </div>

              <div className="login-center-buttons">
                <Link to="/dashboard">
                  <button type="button">Log In</button>
                </Link>

                <GoogleOAuthProvider clientId="276508008629-hs1uinmn8ui8de6gvbjhtd5klh40pruv.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={handleSuccess} // Appel de la fonction handleSuccess en cas de succès
                    onError={handleError}
                  />
                </GoogleOAuthProvider>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

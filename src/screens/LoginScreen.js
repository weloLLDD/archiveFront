 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Action/userActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import Toast from "../components/LoadingError/Toast";
import { useNavigate } from "react-router-dom"; 
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/HomeScreen");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Toast />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #334155, #1e293b)",
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: "20px",
            backgroundColor: "#f8fafc",
          }}
        >
          {error && (
            <Message variant="alert-danger">
              Mot de passe ou email incorrect
            </Message>
          )}
          {loading && <Loading />}

          <h3 className="text-center mb-4" style={{ color: "#334155" }}>
            🔑 Connexion
          </h3>

          <form onSubmit={submitHandler}>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-white">
                <FaEnvelope />
              </span>
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text bg-white">
                <FaLock />
              </span>
              <input
                className="form-control"
                placeholder="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "12px",
                  background: "#334155",
                  border: "none",
                }}
              >
                Se connecter
              </button>
            </div>
          </form>

          <p className="text-center mt-3 mb-0" style={{ fontSize: "14px" }}>
            Pas encore de compte ?{" "}
            <a href="/register" style={{ color: "#334155", fontWeight: "bold" }}>
              Créez-en un
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

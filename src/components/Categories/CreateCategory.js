 import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../Redux/Action/userActions";

const CreateCategory = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("RH");

  const dispatch = useDispatch();

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, success } = userCreate;

  useEffect(() => {
    if (success) {
      alert("Utilisateur créé avec succès !");
      setName("");
      setEmail("");
      setPassword("");
      setRole("RH");
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser({ name, email, password, role }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Créer un utilisateur</h2>

        {loading && <p style={styles.info}>Chargement...</p>}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={submitHandler} style={styles.form}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="RH">RH</option>
            <option value="comptable">Comptable</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>
            Créer
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#f4f7f6",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "transform 0.2s",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    transition: "border-color 0.2s",
  },
  select: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  button: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
  info: {
    color: "#333",
    textAlign: "center",
    marginBottom: "10px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};

// Hover effect avec JS (optionnel)
styles.button[':hover'] = {
  backgroundColor: "#45a049",
  transform: "scale(1.03)",
};

export default CreateCategory;






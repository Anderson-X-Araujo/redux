import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/login";

import styles from "./styles.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <form className="anime" onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="username">
        Username
      </label>
      <input
        type="text"
        id="username"
        className={styles.input}
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />

      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
        id="password"
        className={styles.input}
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />

      <button className={styles.button}>Send</button>
    </form>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, decrease, increase } from "./store/counter";
import { close, open } from "./store/modal";
import { autoLogin, login } from "./store/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { counter, modal, login: login_ } = useSelector((state) => state);

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <div>
      <div>
        {login_?.user?.data?.email && <h1>Hello, {login_.user.data.email}</h1>}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <input
          type="text"
          id="password"
          placeholder="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <button>Send</button>
      </form>

      <div style={{ marginTop: "20px", padding: "10px" }}>
        {modal && <h1>Total: {counter}</h1>}

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => dispatch(increase())}>Increase</button>
          <button onClick={() => dispatch(decrease())}>Decrease</button>
          <button onClick={() => dispatch(open())}>Open</button>
          <button onClick={() => dispatch(close())}>Close</button>
          <button onClick={() => dispatch(add(5))}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default App;

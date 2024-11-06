import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/login";

const Header = () => {
  const { user, token } = useSelector((state) => state.login);
  const loading = user.loading || token.loading;
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Mini Dogs</h1>
      <button
        className={`${styles.login} ${loading ? styles.loading : ""} ${
          user.data ? styles.loaded : ""
        }`}
        aria-label="Logout"
        onClick={() => dispatch(userLogout())}
      ></button>
    </header>
  );
};

export default Header;

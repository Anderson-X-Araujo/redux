/* eslint-disable react/prop-types */
import { useEffect } from "react";
import styles from "./FeedModal.module.css";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/ui";

const FeedModal = () => {
  const { modal } = useSelector((state) => state.ui);
  const { data, loading, error } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  if (!modal) return null;
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;

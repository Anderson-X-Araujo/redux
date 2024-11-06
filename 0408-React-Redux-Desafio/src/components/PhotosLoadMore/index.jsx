import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { loadNewPhotos } from "../../store/photos";
import Loading from "../../utils/Loading";

const PhotosLoadMore = () => {
  const { pages, infinite, loading } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadNewPhotos(pages + 1));
  };

  if (loading) return <Loading />;
  if (!infinite) return null;
  return (
    <button className={styles.button} onClick={handleClick}>
      +
    </button>
  );
};

export default PhotosLoadMore;

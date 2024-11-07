// Photos.js
import { useEffect } from "react";
import { fetchPhotos } from "../../store/photos";
import { useDispatch, useSelector } from "react-redux";

const PhotosComponent = () => {
  const { data } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (!data) return null;
  return (
    <div>
      {data.map((photo) => (
        <li key={photo.id}>{photo.title}</li>
      ))}
    </div>
  );
};

export default PhotosComponent;

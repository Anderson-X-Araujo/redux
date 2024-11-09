// Photos.js
import { useEffect } from "react";
import { fetchPhotos, getOverFiveKg } from "../../store/photos";
import { useDispatch, useSelector } from "react-redux";

const PhotosComponent = () => {
  const data = useSelector(getOverFiveKg);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (!data) return null;
  return (
    <ul>
      {data.map((photo) => (
        <li key={photo.id}>
          {photo.title} | {photo.peso} pounds
        </li>
      ))}
    </ul>
  );
};

export default PhotosComponent;

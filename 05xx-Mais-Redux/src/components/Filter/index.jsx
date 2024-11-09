import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilters, selectUniqueColors } from "../../store/products";

const Filter = () => {
  const dispatch = useDispatch();
  const colors = useSelector(selectUniqueColors);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(changeFilters({ name: "colors", value: selectedColors }));
  }, [selectedColors, dispatch]);

  // Disparamos a ação sempre que o valor de min e max mudam
  useEffect(() => {
    dispatch(
      changeFilters({
        name: "prices",
        value: { min: Number(minPrice), max: Number(maxPrice) },
      }),
    );
  }, [minPrice, maxPrice, dispatch]);

  // Lógica ensinada no curso de React para lidarmos com checkbox
  function handleChange({ target }) {
    if (target.checked) {
      setSelectedColors([...selectedColors, target.value]);
    } else {
      setSelectedColors(
        selectedColors.filter((color) => color !== target.value),
      );
    }
  }

  function handleChecked(color) {
    return selectedColors.includes(color);
  }

  return (
    <form>
      <input
        type="number"
        value={minPrice}
        onChange={({ target }) => setMinPrice(target.value)}
        placeholder="Min"
      />
      <input
        type="number"
        value={maxPrice}
        onChange={({ target }) => setMaxPrice(target.value)}
        placeholder="Max"
      />
      {colors.map((color) => (
        <label key={color}>
          <input
            type="checkbox"
            value={color}
            checked={handleChecked(color)}
            onChange={handleChange}
          />
          {color}
        </label>
      ))}
    </form>
  );
};

export default Filter;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDates } from "./store/date";

const App = () => {
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [location, setLocation] = useState();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addDates({ location, departure, arrival }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Travel</h1>

      <p>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={({ target }) => setLocation(target.value)}
        />
      </p>

      <p>
        <label htmlFor="departure">Departure</label>
        <input
          type="date"
          id="departure"
          value={departure}
          onChange={({ target }) => setDeparture(target.value)}
        />
      </p>

      <p>
        <label htmlFor="arrival">Arrival</label>
        <input
          type="date"
          id="arrival"
          value={arrival}
          onChange={({ target }) => setArrival(target.value)}
        />
      </p>

      <button>Search</button>
    </form>
  );
};

export default App;

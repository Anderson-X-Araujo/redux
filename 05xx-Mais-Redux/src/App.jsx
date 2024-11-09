import { useState } from "react";
import PhotosComponent from "./components/PhotosComponent";
import FormComponent from "./components/FormComponent";
import ProductComponent from "./components/ProductComponent";
import Filter from "./components/Filter";
import "./App.css";

const App = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <section>
      <FormComponent />

      <span style={{ display: "block", margin: "20px 0" }}>
        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      </span>

      <div>
        <button onClick={() => setToggle(!toggle)}>Toggle Photos</button>
        {toggle && <PhotosComponent />}
      </div>

      <span style={{ display: "block", margin: "20px 0" }}>
        +-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      </span>

      <Filter />
      <ProductComponent />
    </section>
  );
};

export default App;

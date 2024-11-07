import { useState } from "react";
import PhotosComponent from "./components/PhotosComponent";
import FormComponent from "./components/FormComponent";

const App = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <section>
      <FormComponent />

      <div>
        <button onClick={() => setToggle(!toggle)}>Toggle Photos</button>
        {toggle && <PhotosComponent />}
      </div>
    </section>
  );
};

export default App;

import React, { useState } from "react";
import Slider from "../Slider";

function FunctionalComponent() {
  const [val, setVal] = useState([]);

  const handleAdd = () => {
    const amount = [...val, []];
    setVal(amount);
  };
  const handleDelete = () => {
    const deleteVal = [...val];
    deleteVal.splice(0, 1);
    setVal(deleteVal);
  };
  const handleChange = () => {};

  return (
    <>
      <button type="submit" onClick={() => handleAdd()}>
        Add Pendulum
      </button>
      <button type="submit" onClick={() => handleDelete()}>
        Remove Pendulum
      </button>

      {val.map((data, i) => {
        return (
          <div>
            <br />
            {/* <input onChange={(e) => handleChange(e, i)} /> */}
            <label>
              <br />
              <span>{`Pendulum ${i + 1}`}</span>
              <br />
              <br />
            </label>
            <Slider minValue={-90} maxValue={90} defaultValue={0} identifier="Theta" index={i + 1}/>
            <label>
              <br />
            </label>
            <Slider minValue={1} maxValue={100} defaultValue={10} identifier="Mass" index={i + 1}/>
            <label>
              <br />
            </label>
            <Slider minValue={1} maxValue={50} defaultValue={5} identifier="Lenght" index={i + 1}/>
          </div>
        );
      })}
    </>
  );
}

export default FunctionalComponent;

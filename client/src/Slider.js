import { useState } from "react";
import ReactSlider from "react-slider";

const Slider = ({ minValue, maxValue, defaultValue, identifier, index, updateCondition }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  
  

  return (
    <div>
      <label htmlFor={identifier}>
        {`Input ${index} ${identifier}: ${currentValue}`}
      </label>
      <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        min={minValue}
        max={maxValue}
        value={currentValue}
        onChange={(value) => {
          setCurrentValue(value);
          updateCondition(value);
        }}
      />
    </div>
  );
};

export default Slider;

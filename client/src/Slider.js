import { useState } from "react";
import ReactSlider from "react-slider";

const Slider = ({ minValue, maxValue, defaultValue, identifier, index }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  return (
    <div>
      <label htmlFor={identifier}>
        {`Input ${identifier} ${index}: ${currentValue}`}
      </label>
      <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        min={minValue}
        max={maxValue}
        value={currentValue}
        onChange={(value) => setCurrentValue(value)}
      />
    </div>
  );
};

export default Slider;

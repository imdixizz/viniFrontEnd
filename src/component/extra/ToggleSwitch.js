import React from "react";

const ToggleSwitch = (props) => {
  return (
    <>
      <label class="switch">
        <input
          type="checkbox"
          checked={props.value}
          onClick={props.onClick}
          className="customCheckbox"
        />
        <div class="slider"></div>
      </label>
    </>
  );
};

export default ToggleSwitch;

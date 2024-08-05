import React from "react";

export const ProgresBar = ({ value }) => {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div className="progress-bar" style={{ width: Number(`${value}`) }}>
        {value}
      </div>
    </div>
  );
};

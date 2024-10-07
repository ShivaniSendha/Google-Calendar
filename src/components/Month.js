import React from "react";
import Day from "./Day";
import './Month.css'; // Import your CSS file

export default function Month({ month }) {
  return (
    <div className="month-container">
      <div className="grid">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import './Labels.css'; // Import your CSS file

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <div className="labels-container">
      <p className="label-title">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="label-item">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`checkbox`}
          />
          <span className="label-text capitalize">{lbl}</span>
        </label>
      ))}
    </div>
  );
}

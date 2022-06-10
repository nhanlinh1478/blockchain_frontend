import React from "react";

import "../../App.css";

const BlockInfo = (props) => {
  const setDate = () => {
    var date = new Date(props.timeMineBlock.timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="Block-info-container">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <label class="Block-info-title">ID: </label>
        <label class="Block-info-content">{props.timeMineBlock.index}</label>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <label class="Block-info-title">Date: </label>
        <label class="Block-info-content">{setDate()}</label>
      </div>
    </div>
  );
};

export default BlockInfo;

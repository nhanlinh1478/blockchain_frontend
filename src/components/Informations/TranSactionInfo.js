import React, { useEffect, useState } from "react";

const TransactionInfo = (props) => {
  const setupStatusLabel = () => {
    if (props.txInfo.completeStatus === true) {
      return <label class="Complete-status-true">Completed</label>;
    } else {
      return <label class="Complete-status-false">Unconfirmed</label>;
    }
  };

  return (
    <div className="Block-info-container">
      <div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
        <label class="Block-info-title">ID</label>
        <label class="Block-info-content">{props.txInfo.id}</label>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <label class="Block-info-title">From</label>
        <label class="Block-info-content">{props.txInfo.sender}</label>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <label class="Block-info-title">To</label>
        <label class="Block-info-content">{props.txInfo.receiver}</label>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <label class="Block-info-title">Status:</label>
        {setupStatusLabel()}
      </div>
    </div>
  );
};

export default TransactionInfo;

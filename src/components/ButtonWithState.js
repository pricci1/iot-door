import React from "react";

const ButtonWithState = ({ senderCallback, message, text }) => {
  const onclick = e => {
    e.preventDefault();
    senderCallback(message);
  };
  return (
    <button className="btn btn-success m-1" onClick={onclick}>
      {text}
    </button>
  );
};

export default ButtonWithState;

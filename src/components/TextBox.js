import React from "react";

const TextBox = ({ number, text }) => {
  return (
    <span>
      {text}
      {number ? `: ${number}` : ""}
    </span>
  );
};

export default TextBox;

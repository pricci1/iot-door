import React from "react";

const TestMessage = ({ senderCallback }) => {
  const onclick = e => {
    e.preventDefault();
    senderCallback("4");
  };
  return (
    <>
      <button onClick={onclick}>Send Message</button>
    </>
  );
};

export default TestMessage;

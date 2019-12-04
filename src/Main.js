import React from "react";
import { subscribe } from 'mqtt-react';
import { subTopic, pubTopic} from "./consts";

const Main = ({ mqtt }) => {
  const sendMessage = (e) => {
    e.preventDefault();
    mqtt.publish(pubTopic, 'My Message');
  };
  return (
    <>
      <button onClick={sendMessage}>
        Send Message
      </button>
      <h2>Start editing to see some magic happen!</h2>
    </>
  );
};

export default subscribe({
  topic: subTopic
})(Main);

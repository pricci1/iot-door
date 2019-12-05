import React, { useEffect, useState } from "react";
import { subscribe } from "mqtt-react";
import { subTopic, pubTopic } from "./consts";
// import TestMessage from "./components/TestMessage";
import ButtonWithState from "./components/ButtonWithState";
import TextBox from "./components/TextBox";

function lastInfo(data) {
  try {
    if (data[0]) {
      const str = data[0];
      const splitted = str.split("_");
      if (splitted.length >= 6) {
        return {
          ledPhoto: splitted[0][1],
          ledProx: splitted[1],
          lcd: splitted[2],
          door: splitted[3],
          temperature: splitted[4],
          humidity: splitted[5],
          fan: splitted[6]
        };
      }
      return null;
    }
  } catch (error) {
    return null;
  }
}

const Main = ({ mqtt, data }) => {
  const sendMessage = message => {
    mqtt.publish(pubTopic, message);
  };

  const [fetched, setFetched] = useState({});
  useEffect(() => {
    setFetched(lastInfo(data) || {});
    console.log(data[0]);
  }, [data]);

  const state = {
    0: " Off",
    1: " On",
    2: " Auto",
    "2\n": " Auto"
  };

  return (
    <div className="col">
      {/* <TestMessage senderCallback={sendMessage} /> */}
      <ButtonWithState
        senderCallback={sendMessage}
        message="4"
        text="Open door"
      />
      <br />
      <ButtonWithState
        senderCallback={sendMessage}
        message="1"
        text="Internal LEDs"
      />
      <br />
      <ButtonWithState
        senderCallback={sendMessage}
        message="2"
        text="Door LEDs"
      />
      <br />
      <ButtonWithState senderCallback={sendMessage} message="5" text="Fan" />
      <br />
      <ButtonWithState senderCallback={sendMessage} message="3" text="Screen" />
      <br />
      <TextBox number={fetched.temperature} text="Temperature (C)" />
      <br />
      <TextBox number={fetched.humidity} text="Humidity (%)" />
      <br />
      <TextBox
        text={`Fan: ${
          fetched.fan == 2 ? "Auto" : fetched.fan == 1 ? "On" : "Off"
        }`}
      />
      <br />
      <TextBox text={`PhotoLed: ${state[fetched.ledPhoto]}`} />
      <br />
      <TextBox text={`ProximityLed: ${state[fetched.ledProx]}`} />
      <br />
      <TextBox text={`PhotoLed: ${state[fetched.ledPhoto]}`} />
      <br />
      <TextBox text={`Screen: ${fetched.lcd == 1 ? "On" : "Off"}`} />
    </div>
  );
};

export default subscribe({
  topic: subTopic
})(Main);

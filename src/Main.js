import React, { useEffect, useState } from "react";
import { subscribe } from "mqtt-react";
import { subTopic, pubTopic } from "./consts";
// import TestMessage from "./components/TestMessage";
import ButtonWithState from "./components/ButtonWithState";
import TextBox from "./components/TextBox";

function lastInfo(data) {
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

  return (
    <>
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
        text="Leds photo"
      />
      <br />
      <ButtonWithState
        senderCallback={sendMessage}
        message="2"
        text="Leds proimity"
      />
      <br />
      <ButtonWithState senderCallback={sendMessage} message="3" text="Screen" />
      <br />
      <TextBox number={fetched.temperature} text="Temperature" />
      <br />
      <TextBox number={fetched.humidity} text="Humidity" />
      <br />
      <TextBox text={`Fan: ${fetched.fan}`} />
      <br />
      <TextBox text={`PhotoLed: ${fetched.ledPhoto}`} />
      <br />
      <TextBox text={`ProximityLed: ${fetched.ledProx}`} />
      <br />
      <TextBox text={`PhotoLed: ${fetched.ledPhoto}`} />
      <br />
      <TextBox text={`Screen: ${fetched.lcd}`} />
    </>
  );
};

export default subscribe({
  topic: subTopic
})(Main);

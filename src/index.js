import React from "react";
import ReactDOM from "react-dom";
import { Connector } from 'mqtt-react';

import "./styles.css";
import Main from "./Main";
import { serverAddress, serverPort, subTopic, pubTopic } from "./consts";

function App() {
  return (
    <div className="App">
    <Connector mqttProps={{host: serverAddress, port: serverPort}}>
      <Main pubTopic={pubTopic} subTopic={subTopic}/>
    </Connector>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

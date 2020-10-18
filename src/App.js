import React from 'react';
import './App.css';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:8090');
 
class App extends React.Component {
  state = {
    mobs: [],
    messages: [],
    currentMessage: null
  };

  componentDidMount = async () => {
    client.onopen = async () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = async (message) => {
      console.log("MESSAGE: " + message.data);
      let messages = [...this.state.messages];
      messages.unshift(JSON.parse(message.data));
      this.setState({messages});
    };

    setInterval(async () => {
      if (this.state.messages.length > 0) {
        let messages = [...this.state.messages];
        let currentMessage = messages.pop();
        let mobs = [...this.state.mobs];

        let eventData = currentMessage.eventData;

        // Every message has the encounter table so we can update
        mobs = Object.keys(eventData.encounterTable).map((mobName) => {
          return eventData.encounterTable[mobName];
        })

        switch(currentMessage.type) {
          case "ATTACK":
            break;
          case "ATTACKED":
            break;
          case "JOIN":
            break;
          case "ITEM_GET":
            break;
        }

        this.setState({currentMessage, messages, mobs});
      }
    }, 5000);
  }

  render() {
    let eventData = this.state.currentMessage ? this.state.currentMessage.eventData : null;

    return (
      <div style={{width: "80%", margin: "auto"}}>
        <h1 style={{textAlign: "center"}}>Battle Panel</h1>
        <div style={{textAlign: "center", height: "50px"}}>{eventData ? eventData.results.message : null}</div>
        <div>
          {this.state.mobs.map((mob) => {
            return (
              <div style={{backgroundColor: "gray", color: "white", width: "300px", padding: "20px", margin: "10px auto"}} key={`${mob.spawnKey}`}>
                <div style={{textAlign: "center"}}><strong>~{mob.spawnKey}</strong></div>
                <div><strong>HP</strong>: {mob.hp}/{mob.maxHp}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;

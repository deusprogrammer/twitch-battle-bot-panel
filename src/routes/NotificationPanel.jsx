import React from 'react';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:8090');

export default class NotificationPanel extends React.Component {
    state = {
      messages: [],
      currentMessage: null
    };

    connect = async () => {
      const ws = new W3CWebSocket('ws://localhost:8090');
      ws.onmessage = async (message) => {
        let messages = [...this.state.messages];
        messages.unshift(JSON.parse(message.data));
        this.setState({messages});
      };
  
      ws.onclose = async (e) => {
          console.log('Socket is closed. Reconnect will be attempted in 5 second.', e.reason);
          this.setState({messages: [], currentMessage: null});
          setTimeout(async () => {
              this.connect();
          }, 5000);
      };
  
      ws.onerror = async (err) => {
          console.error('Socket encountered error: ', err.message, 'Closing socket');
          ws.close();
      };
    }
    
    componentDidMount = async () => {
      this.connect();

        setInterval(async () => {
          if (this.state.messages.length > 0) {
            let messages = [...this.state.messages];
            let currentMessage = messages.pop();

            // let eventData = currentMessage.eventData;

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

            this.setState({currentMessage, messages});
          }
        }, 1000);
      }
    
      render() {
        let eventData = this.state.currentMessage ? this.state.currentMessage.eventData : null;
    
        return (
            <div style={{width: "100%", height: "150px", lineHeight: "150px", textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "white", WebkitTextStroke: "1px black"}}>
                <div style={{width: "100%", height: "100%"}}>{eventData ? eventData.results.message : null}</div>
            </div>
        );
      }
}
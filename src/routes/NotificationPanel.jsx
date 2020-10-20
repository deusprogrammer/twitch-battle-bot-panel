import React from 'react';

import { w3cwebsocket as W3CWebSocket } from "websocket";

export default class NotificationPanel extends React.Component {
    state = {
        messages: [],
        currentMessage: null,
        notificationOpacity: 0,
        readyForNew: true
    };

    connect = async () => {
        const ws = new W3CWebSocket('ws://localhost:8090');
        ws.onmessage = async (message) => {
            console.log("MESSAGE: " + message.data);
            let messages = [...this.state.messages];
            messages.unshift(JSON.parse(message.data));
            this.setState({ messages });
        };

        ws.onclose = async (e) => {
            console.log('Socket is closed. Reconnect will be attempted in 5 second.', e.reason);
            this.setState({ messages: [], currentMessage: null });
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
            if (this.state.messages.length > 0 && this.state.readyForNew) {
                let messages = [...this.state.messages];
                let currentMessage = messages.pop();

                switch (currentMessage.type) {
                    case "ATTACK":
                        break;
                    case "ATTACKED":
                        break;
                    case "DIED":
                        break;
                    case "JOIN":
                        break;
                    case "ITEM_GET":
                        break;
                }

                this.setState({ currentMessage, messages, readyForNew: false }, () => {
                    this.fadeIn();
                });
            }
        }, 1000);
    }

    fadeIn = async () => {
        setTimeout(async () => {
            let notificationOpacity = Math.min(1, this.state.notificationOpacity + 0.01);
            this.setState({notificationOpacity});

            if (notificationOpacity < 1) {
                this.fadeIn();
            } else {
                setTimeout(async () => {
                    this.fadeOut();
                }, 2000)
            }
        }, 10);
    }

    fadeOut = async () => {
        setTimeout(async () => {
            let notificationOpacity = Math.max(0, this.state.notificationOpacity - 0.01);
            this.setState({notificationOpacity});

            if (notificationOpacity > 0) {
                this.fadeOut();
            } else {
                this.setState({readyForNew: true});
            }
        }, 10);
    }

    render() {
        let eventData = this.state.currentMessage ? this.state.currentMessage.eventData : null;
        let message = eventData ? eventData.results.message : null;

        return (
            <div style={{ width: "100%", height: "60px", lineHeight: "60px", textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "white", WebkitTextStroke: "1px black", opacity: this.state.notificationOpacity }}>
                <div style={{ width: "100%", height: "100%" }}>{message}</div>
            </div>
        );
    }
}
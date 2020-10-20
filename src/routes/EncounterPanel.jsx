import React from 'react';

import { w3cwebsocket as W3CWebSocket } from "websocket";
import Monster from '../components/Monster';

export default class EncounterPanel extends React.Component {
    state = {
        mobs: []
    };

    connect = async () => {
        const ws = new W3CWebSocket('ws://localhost:8090');
        ws.onmessage = async (message) => {
            let event = JSON.parse(message.data);
            let eventData = event.eventData;
            let mobs = [];

            // Every message has the encounter table so we can update
            mobs = Object.keys(eventData.encounterTable).map((mobName) => {
                return eventData.encounterTable[mobName];
            });

            this.setState({ mobs });
        };

        ws.onclose = async (e) => {
            console.log('Socket is closed. Reconnect will be attempted in 5 second.', e.reason);
            this.setState({ mobs: [] });
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
    }

    render() {
        return (
            <div style={{ width: "80%", margin: "auto" }}>
                {this.state.mobs.filter(mob => mob.hp > 0).length > 0 ? <h3 style={{ textAlign: "center", color: "white", WebkitTextStroke: "1px black" }}>Monsters in Chat</h3> : null}
                <div style={{ fontSize: "17px", fontWeight: "bold", color: "white", WebkitTextStroke: "1px black" }}>
                    <div>
                        {this.state.mobs.map((mob) => {
                            return (
                                <Monster mob={mob} key={`mob-${mob.spawnKey}`} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
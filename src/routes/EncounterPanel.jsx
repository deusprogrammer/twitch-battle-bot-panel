import React from 'react';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:8090');

export default class EncounterPanel extends React.Component {
    state = {
        mobs: []
    };

    componentDidMount = async () => {
        client.onmessage = async (message) => {
            let event = JSON.parse(message.data);
            let eventData = event.eventData;
            let mobs = [];

            // Every message has the encounter table so we can update
            mobs = Object.keys(eventData.encounterTable).map((mobName) => {
                return eventData.encounterTable[mobName];
            });

            this.setState({mobs});
        };
      }

    render() {
        return (
            <div style={{width: "80%", margin: "auto"}}>
                {this.state.mobs.length > 0 ? <h3 style={{textAlign: "center", color: "white", WebkitTextStroke: "1px black"}}>Monsters in Chat</h3> : null}
                <div style={{fontSize: "17px", fontWeight: "bold", color: "white", WebkitTextStroke: "1px black"}}>
                    <div>
                        {this.state.mobs.map((mob) => {
                            let color = "";
                            switch (mob.type) {
                                case "ELITE":
                                    color = "blue";
                                    break;
                                case "BOSS":
                                    color = "purple";
                                    break;
                                case "RARE":
                                    color = "orange";
                                    break;
                                case "MOB":
                                default:
                                    color = "gray";
                            }
                            return (
                                <div style={{backgroundColor: color, width: "200px", padding: "10px", margin: "10px auto"}} key={`${mob.spawnKey}`}>
                                    <div style={{textAlign: "center"}}><strong>{mob.name}</strong></div>
                                    <div><strong>HP</strong>: {mob.hp}/{mob.maxHp}</div>
                                    <hr />
                                    <div style={{textAlign: "center"}}>To Attack:</div>
                                    <div style={{textAlign: "center"}}><strong>!attack ~{mob.spawnKey}</strong></div>
                                </div>
                            );
                    })}
                    </div>
                </div>
            </div>
        );
    }
}
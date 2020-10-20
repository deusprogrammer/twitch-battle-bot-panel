import React from 'react';

import Fade from './Fade';

export default (props) => {
    let color = "";
    switch (props.mob.type) {
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
        <Fade show={props.mob.hp >= 0}>
            <div style={{ backgroundColor: color, width: "200px", padding: "10px", margin: "10px auto" }}>
                <div style={{ textAlign: "center" }}><strong>{props.mob.name}</strong></div>
                <div><strong>HP</strong>: {props.mob.hp}/{props.mob.maxHp}</div>
                <div style={{backgroundColor: "red", width: "100px", height: "15px", padding: "0px", margin: "0px", border: "1px solid white"}}>
                    <div style={{backgroundColor: "green", width: `${props.mob.hp/props.mob.maxHp * 100}px`, height: "15px", padding: "0px", margin: "0px"}}></div>
                </div>
                <hr />
                <div style={{ textAlign: "center" }}>To Attack:</div>
                <div style={{ textAlign: "center" }}><strong>!attack ~{props.mob.spawnKey}</strong></div>
            </div>
        </Fade>
    )
}
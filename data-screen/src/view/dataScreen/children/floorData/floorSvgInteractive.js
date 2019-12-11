import React, { Component } from "react";
import FloorSelect from "./floorSelect";
class FloorSvgInteractive extends Component {
    render() {
        return (
            <div className="svg-interact-wrap">
                <FloorSelect />
            </div>
        )
    }
}

export default FloorSvgInteractive;
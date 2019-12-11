import React, { Component } from "react";
import PropsType from "prop-types";
import "./specialTitle.less";
class SpecialTitle extends Component {
    PropsType = {
        title: PropsType.oneOfType([
            PropsType.string,
            PropsType.number
        ]).isRequired
    }
    render() {
        const { title } = this.props;
        return (
            <div className="special-title-wrap">
                <h3 className="title">{title}</h3>
            </div>
        )
    }
}

export default SpecialTitle;
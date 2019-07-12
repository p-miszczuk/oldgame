import {connect} from 'react-redux';
import React from "react";

const mapStateToProps = ({time}) => {
    return {...time}
}

class Time extends React.Component {
    
    render() {
        const gameTime = `${this.props.minutes < 10 ? "0": ""}${this.props.minutes} : ${this.props.seconds < 10 ? "0": ""}${this.props.seconds} : ${this.props.milseconds < 10 ? "0" : ""}${this.props.milseconds}`; 
        return (
            <div className="h5">
                {gameTime}
            </div>
        )
    }
}

const Timer = connect(mapStateToProps)(Time);
export default Timer;
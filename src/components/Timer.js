import { connect } from "react-redux";
import React from "react";

class Timer extends React.Component {
  render() {
    const { seconds, milseconds, minutes } = this.props;
    const gameTime = `${minutes < 10 ? "0" : ""}${this.props.minutes} : ${
      seconds < 10 ? "0" : ""
    }${seconds} : ${milseconds < 10 ? "0" : ""}${milseconds}`;
    return <div className="h5">{gameTime}</div>;
  }
}

const mapStateToProps = ({ time }) => ({
  seconds: time.seconds,
  milseconds: time.milseconds,
  minutes: time.minutes
});

export default connect(mapStateToProps)(Timer);

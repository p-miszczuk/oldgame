import React from "react";
import { connect } from "react-redux";
import { pos } from "./data/data";
import InformationBoard from "./components/InfoBoard";
import ButtonsBoard from "./components/ButtonsBoard";
import GameScores from "./components/ScoresTable";
import { changePosition } from "./redux/reducers/board/actions";
import {
  resetPositions,
  changeMilseconds,
  changeSeconds,
  changeMinutes,
  startGame
} from "./redux/reducers/time/actions";
import { endGame, resetGame } from "./redux/reducers/scores/actions";

class Squares extends React.Component {
  state = {
    finishGame: 2,
    btns: null,
    resetFlag: false
  };

  intervalID = 0;

  handleClick = (item, e) => {
    const { time } = this.props;
    e.preventDefault();

    this.resetButtons();

    if (item.id !== " ") {
      e.target.style.backgroundColor = "red";
      pos.idElem = item.id;
      pos.x = item.posX;
      pos.y = item.posY;
    } else {
      if (item.id === " " && pos.idElem !== 0) {
        const { change, sounds } = this.props;
        if (
          pos.x - item.posX <= 70 &&
          pos.x - item.posX >= -70 &&
          (pos.y - item.posY <= 70 && pos.y - item.posY >= -70) &&
          pos.x - item.posX !== pos.y - item.posY &&
          pos.x - item.posX !== -(pos.y - item.posY)
        ) {
          sounds.moveSound.play();
          const { id, posX, posY } = item;
          const { idElem, x, y } = pos;
          change({ idElem, posX, posY });
          change({ id, x, y });
          pos.idElem = 0;
        }
      }
    }

    if (!time.start) {
      this.props.playTimeStart();
      clearInterval(this.intervalID);
      this.timer();
    }
  };

  handleReset = () => {
    const { reset, playTimeReset } = this.props;
    this.resetButtons();
    reset();
    playTimeReset();
  };

  checkEnd = () => {
    const { btns, finishGame } = this.state;
    let counter = 0;
    btns.forEach(item => {
      const { left, top } = item.style;
      if (left === "0px" && top === "0px" && item.innerHTML === "1") counter++;
      if (left === "70px" && top === "0px" && item.innerHTML === "2") counter++;
      if (left === "140px" && top === "0px" && item.innerHTML === "3")
        counter++;
      if (left === "210px" && top === "0px" && item.innerHTML === "4")
        counter++;

      if (left === "0px" && top === "70px" && item.innerHTML === "5") counter++;
      if (left === "70px" && top === "70px" && item.innerHTML === "6")
        counter++;
      if (left === "140px" && top === "70px" && item.innerHTML === "7")
        counter++;
      if (left === "210px" && top === "70px" && item.innerHTML === "8")
        counter++;

      if (left === "0px" && top === "140px" && item.innerHTML === "9")
        counter++;
      if (left === "70px" && top === "140px" && item.innerHTML === "10")
        counter++;
      if (left === "140px" && top === "140px" && item.innerHTML === "11")
        counter++;
      if (left === "210px" && top === "140px" && item.innerHTML === "12")
        counter++;

      if (left === "0px" && top === "210px" && item.innerHTML === "13")
        counter++;
      if (left === "70px" && top === "210px" && item.innerHTML === "14")
        counter++;
      if (left === "140px" && top === "210px" && item.innerHTML === "15")
        counter++;
    });

    if (counter >= finishGame) return true;
    return false;
  };

  resetButtons = () => {
    const { btns } = this.state;
    btns.forEach(item => (item.style.backgroundColor = "#008080"));
  };

  componentDidMount() {
    this.setState({
      btns: document.querySelectorAll(".button"),
      resetFlag: true
    });
  }

  timer = () => {
    this.intervalID = setInterval(() => {
      const {
        time,
        sounds,
        minutes,
        seconds,
        milseconds,
        playTimeFinish
      } = this.props;

      if (time.start) {
        const checkStatus = this.checkEnd();
        if (checkStatus) {
          window.clearInterval(this.intervalID);
          sounds.finishSound.play();
          const gameTime = `${time.minutes < 10 ? "0" : ""}${time.minutes}.${
            time.seconds < 10 ? "0" : ""
          }${time.seconds}.${time.milseconds < 10 ? "0" : ""}${
            time.milseconds
          }`;
          playTimeFinish(gameTime);
          this.resetButtons();
        }
        if (time.milseconds >= 99) seconds();
        if (time.seconds >= 59) minutes();
        milseconds();
      }
    }, 10);
  };

  componentDidUpdate() {
    const { resetFlag } = this.state;
    if (resetFlag) {
      this.resetButtons();
      this.setState({ resetFlag: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="row">
        <div className="col-sm-6 text-center">
          <InformationBoard reset={this.handleReset} />
          <ButtonsBoard
            board={board}
            click={(item, e) => this.handleClick(item, e)}
          />
        </div>
        <div className="col-sm-6 text-center">
          <GameScores />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = {
  change: changePosition,
  reset: resetPositions,
  milseconds: changeMilseconds,
  seconds: changeSeconds,
  minutes: changeMinutes,
  playTimeStart: startGame,
  playTimeFinish: endGame,
  playTimeReset: resetGame
};

const ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Squares);
export default ConnectApp;

import React from "react";
import { connect } from "react-redux";
import { pos } from "./data/data";
import Button from "./components/Buttons/Button";
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
import firebase from "firebase/app";
import "firebase/auth";

const FINISH_GAME = 15;

class Squares extends React.Component {
  state = {
    auth: false,
    btns: null,
    resetFlag: false
  };

  intervalID = 0;

  handleClick = (item, e) => {
    const { time } = this.props;
    e.preventDefault();

    !!this.state.btns && this.resetButtons();

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
          pos.y - item.posY <= 70 &&
          pos.y - item.posY >= -70 &&
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
    !!this.state.btns && this.resetButtons();
    reset();
    playTimeReset();
  };

  checkEnd = () => {
    const { btns } = this.state;
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

    if (counter >= FINISH_GAME) return true;
    return false;
  };

  resetButtons = () => {
    const { btns } = this.state;
    btns.forEach(item => (item.style.backgroundColor = "#008080"));
  };

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
          !!this.state.btns && this.resetButtons();
        }
        if (time.milseconds >= 99) seconds();
        if (time.seconds >= 59) minutes();
        milseconds();
      }
    }, 10);
  };

  componentDidUpdate() {
    const { resetFlag, btns, auth } = this.state;

    if (resetFlag) {
      !!btns && this.resetButtons();
      this.setState({ resetFlag: false });
    }

    if (auth && !btns) {
      this.setState({
        btns: document.querySelectorAll(".button"),
        resetFlag: true
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleLogin = () => {
    if (!this.state.auth) {
      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          this.setState({ auth: true });
        })
        .catch(error => console.log(error.message));
    } else {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setState({ auth: false, btns: null, resetFlag: false });
          clearInterval(this.intervalID);
          const { reset, playTimeReset } = this.props;
          reset();
          playTimeReset();
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const { board } = this.props;

    if (!this.state.auth)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <p>Witaj w Retro Game. </p>
          <p>Ułóż kwadraty od 1 do 15 jak najszybciej.</p>
          <p>Udanej zabawy.</p>
          <Button
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              backgroundColor: "green",
              borderColor: "green",
              color: "#fff"
            }}
            onClick={this.handleLogin}
            text={"Przejdź do gry"}
          />
        </div>
      );

    return (
      <div className="row px-3">
        <div style={{ width: "100%", paddingBottom: "30px" }}>
          <Button
            text={"Wyloguj z gry"}
            style={{
              width: "130px",
              height: "40px",
              borderRadius: "5px",
              color: "#fff",
              borderColor: "blue",
              backgroundColor: "blue"
            }}
            onClick={this.handleLogin}
          />
        </div>
        <div className="col-sm-6 text-center">
          <InformationBoard reset={this.handleReset} />
          <ButtonsBoard board={board} click={this.handleClick} />
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

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(Squares);
export default ConnectApp;

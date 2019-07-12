import React from 'react';
import { connect } from "react-redux";
import {pos} from "./data/data";
import InformationBoard from './components/InfoBoard';
import Buttons from "./components/ButtonsBoard";
import GameScores from "./components/ScoresTable";
import * as actions from './data/actions';

const mapStateToProps = state => {
    return {...state}
}

const mapDispatchToProps = dispatch => {
    return {
        change: (value) => dispatch(actions.changePosition(value)),
        reset: () => dispatch(actions.resetPositions()),
        milseconds: () => dispatch(actions.changeMilseconds()),
        seconds: () => dispatch(actions.changeSeconds()),
        minutes: () => dispatch(actions.changeMinutes()),
        playTimeStart: () => dispatch(actions.startGame()),
        playTimeFinish: (time) => dispatch(actions.endGame(time)),
        playTimeReset: () => dispatch(actions.resetTimer())
    }
}

class Squares extends React.Component {

    intervalID = 0;
    btns = null;

    handleClick = (item,e) => {
        e.preventDefault();
    
        this.resetButtons(this.btns);
        
        if (item.id !== " ") {
            e.target.style.backgroundColor = "red";
            pos.idElem = item.id;
            pos.x = item.posX;
            pos.y = item.posY;
        }
        else {
            if (item.id === " " && pos.idElem !== 0) {
               
                if ((pos.x - item.posX <= 70 && pos.x - item.posX >= -70) && 
                    (pos.y - item.posY <= 70 && pos.y - item.posY >= -70) &&
                    (pos.x - item.posX !== pos.y - item.posY) && 
                    (pos.x - item.posX !== -(pos.y - item.posY))) {
                    this.props.sounds.moveSound.play();
                    const {id, posX, posY} = item;
                    const {idElem ,x, y} = pos;
                    this.props.change({idElem, posX, posY});
                    this.props.change({id, x, y});
                    pos.idElem = 0;
                }
            }
        }

        if (!this.props.time.start) {
            this.props.playTimeStart();
            clearInterval(this.intervalID);
            this.timer();
        }
    }

    handleReset = () => {
        this.resetButtons(this.btns);
        this.props.reset();
        this.props.playTimeReset();
    }

    checkEnd = () => {
       
        let counter = 0;
        this.btns.forEach( (item) => {
            const {left,top} = item.style;
            if (left === "0px" && top === "0px" && item.innerHTML === "1") counter++; 
            if (left === "70px" && top === "0px" && item.innerHTML === "2") counter++;
            if (left === "140px" && top === "0px" && item.innerHTML === "3") counter++;
            if (left === "210px" && top === "0px" && item.innerHTML === "4") counter++;

            if (left === "0px" && top === "70px" && item.innerHTML === "5") counter++; 
            if (left === "70px" && top === "70px" && item.innerHTML === "6") counter++;
            if (left === "140px" && top === "70px" && item.innerHTML === "7") counter++;
            if (left === "210px" && top === "70px" && item.innerHTML === "8") counter++;

            if (left === "0px" && top === "140px" && item.innerHTML === "9") counter++; 
            if (left === "70px" && top === "140px" && item.innerHTML === "10") counter++;
            if (left === "140px" && top === "140px" && item.innerHTML === "11") counter++;
            if (left === "210px" && top === "140px" && item.innerHTML === "12") counter++;

            if (left === "0px" && top === "210px" && item.innerHTML === "13") counter++; 
            if (left === "70px" && top === "210px" && item.innerHTML === "14") counter++;
            if (left === "140px" && top === "210px" && item.innerHTML === "15") counter++;
           
        });

        if (counter >= 2) 
            return true;
        else
            return false;
    }

    resetButtons = (btns) => {
        btns.forEach(item => (
            item.style.backgroundColor = "#008080"
        ));
    }

    componentDidMount() {
        this.btns = document.querySelectorAll('.button');
        this.resetButtons(this.btns);
    }

    timer = () => {
        this.intervalID = setInterval(() => {
            if (this.props.time.start === true) {
                let checkStatus = this.checkEnd();
                if (checkStatus === true) {
                    window.clearInterval(this.intervalID);
                    this.props.sounds.finishSound.play();
                    this.gameTime = `${this.props.time.minutes < 10 ? "0": ""}${this.props.time.minutes}.${this.props.time.seconds < 10 ? "0": ""}${this.props.time.seconds}.${this.props.time.milseconds < 10 ? "0" : ""}${this.props.time.milseconds}`;
                    this.props.playTimeFinish(this.gameTime);
                }
                if (this.props.time.milseconds >= 99) this.props.seconds();
                if (this.props.time.seconds >= 59) this.props.minutes();
                this.props.milseconds();
            }
        }, 10);
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    
    render() {
                       
        return (
            <div className="row"> 
              <div className="col-sm-6 text-center">
                <InformationBoard 
                    reset={this.handleReset}
                />
                <Buttons 
                    reductor={this.props.reductor} 
                    click={(item,e) => this.handleClick(item,e)}    
                />
              </div>
              <div className="col-sm-6 text-center">  
                <GameScores />        
              </div>
            </div>
        )
    }
}

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(Squares);
export default ConnectApp;

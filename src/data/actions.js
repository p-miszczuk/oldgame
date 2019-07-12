import 'firebase/database';
import firebase from "firebase/app";
import {DB_CONFIG} from '../config/config';
import * as flag from './data';

const app = firebase.initializeApp(DB_CONFIG);
const database = app.database().ref().child('scores');

const changePosition = (values) => {
    return {type: flag.CHANGE, values}
}

const resetPositions = () => {
    return {type: flag.RESET}
}

const changeMilseconds = () => {
    return {type: flag.MILSECONDS}
}

const changeSeconds = () => {
    return {type: flag.SECONDS}
} 

const changeMinutes = () => {
    return {type: flag.MINUTES}
}

const startGame = () => {
    return {type: flag.START}
}

const endGame = (time) => {
    return {type: flag.FINISH, payload: time}
}

const resetTimer = () => {
    return {type: flag.RESET}
}

const nickUpdate = nick => {
    return {type: flag.NICK_UPDATE, nick}
}

const timeUpdate = timeScore => {
    return {type: flag.ADD_SCORE, timeScore}
}


const Fetch = () => {
    return dispatch => {
      
        database.on('value', snap => {
            
            dispatch({
                type: flag.GET_VALUES,
                payload: snap.val()
            })
            
        })
        
    } 
}

const AddScore = (item) => {
     return dispatch => {
         database.push(item);
         return dispatch({type: flag.RESET})
     };
}

export {AddScore,Fetch,nickUpdate,timeUpdate,changePosition,resetPositions,changeMilseconds,changeSeconds,changeMinutes,startGame,endGame,resetTimer};
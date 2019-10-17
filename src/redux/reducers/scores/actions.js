import { DB_CONFIG } from "../../../config/config";
import "firebase/database";
import firebase from "firebase/app";

export const GET_VALUES = "GET_VALUES";
export const NICK_UPDATE = "NICK_UPDATE";
export const FINISH = "FINISH";
export const RESET = "RESET";
export const ADD_SCORE = "ADD_SCORE";

const app = firebase.initializeApp(DB_CONFIG);
const database = app
  .database()
  .ref()
  .child("scores");

export const fetchData = () => {
  return dispatch => {
    database.on("value", snap => {
      dispatch({
        type: GET_VALUES,
        payload: snap.val()
      });
    });
  };
};

export const nickUpdate = nick => {
  return { type: NICK_UPDATE, nick };
};

export const endGame = time => {
  return { type: FINISH, time };
};

export const resetGame = () => {
  return { type: RESET };
};

export const addScores = item => {
  return dispatch => {
    database.push(item);
    return dispatch({ type: RESET });
  };
};

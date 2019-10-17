import { createStore, applyMiddleware, combineReducers } from "redux";
import board from "../reducers/board/reducer";
import scores from "../reducers/scores/reducer";
import sounds from "../reducers/sound/reducer";
import time from "../reducers/time/reducer";
import thunk from "redux-thunk";

// const check = store => next => action => {
//     if (action.type === "RESET")
//         console.log("RESET", action);

//     return next(action);
// }

const reducer = combineReducers({ board, time, sounds, scores });
const store = createStore(reducer, applyMiddleware(thunk));
export default store;

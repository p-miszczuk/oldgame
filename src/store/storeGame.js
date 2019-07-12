import { createStore, applyMiddleware, combineReducers } from "redux";
import {reductor,time,sounds,scores} from "../reducers/reducers";
import thunk from "redux-thunk";

// const check = store => next => action => {
//     if (action.type === "RESET")
//         console.log("RESET", action);
        
//     return next(action);
// }

const reducer = combineReducers({reductor,time,sounds,scores});
const store = createStore(reducer,applyMiddleware(thunk));
export default store;
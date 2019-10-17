import { GET_VALUES, NICK_UPDATE, ADD_SCORE, RESET, FINISH } from "./actions";

//scores initial parametrs
const initScore = {
  nick: "",
  score: "",
  setScore: []
};

//scores initial parametrs
const scores = (state = initScore, action) => {
  if (action.type === GET_VALUES) {
    return { ...state, setScore: action.payload };
  } else if (action.type === NICK_UPDATE) {
    return { ...state, nick: action.nick };
  } else if (action.type === ADD_SCORE) {
    return { ...state, score: action.timeScore };
  } else if (action.type === RESET) {
    return { ...state, nick: "", score: "", start: false, finish: false };
  } else if (action.type === FINISH) {
    return { ...state, start: false, finish: true, score: action.time };
  }

  return state;
};

export default scores;

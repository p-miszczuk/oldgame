import { MILSECONDS, SECONDS, MINUTES, START, FINISH, RESET } from "./actions";

//timer initial parametrs
const initialTime = {
  minutes: 0,
  seconds: 0,
  milseconds: 0,
  start: false,
  finish: false
};

//timmer reducer
const time = (state = initialTime, action) => {
  if (action.type === MILSECONDS) {
    state.milseconds += 1;
    return { ...state };
  } else if (action.type === SECONDS) {
    state.seconds += 1;
    state.milseconds = 0;
    return { ...state };
  } else if (action.type === MINUTES) {
    state.minutes += 1;
    state.seconds = 0;
    return { ...state };
  } else if (action.type === START) {
    state.start = true;
    return { ...state };
  } else if (action.type === FINISH) {
    state.finish = true;
    return { ...state };
  } else if (action.type === RESET) {
    state.minutes = 0;
    state.seconds = 0;
    state.milseconds = 0;
    state.start = false;
    state.finish = false;
    return { ...state };
  }

  return state;
};

export default time;

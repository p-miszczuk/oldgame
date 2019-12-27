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
    return { ...state, milseconds: (state.milseconds += 1) };
  } else if (action.type === SECONDS) {
    return {
      ...state,
      seconds: (state.seconds += 1),
      milseconds: 0
    };
  } else if (action.type === MINUTES) {
    return {
      ...state,
      minutes: (state.minutes += 1),
      seconds: 0
    };
  } else if (action.type === START) {
    return { ...state, start: true };
  } else if (action.type === FINISH) {
    return { ...state, finish: true };
  } else if (action.type === RESET) {
    return {
      ...state,
      minutes: 0,
      seconds: 0,
      milseconds: 0,
      start: false,
      finish: false
    };
  }

  return state;
};

export default time;

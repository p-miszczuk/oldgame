import { CHANGE_VOL } from "./actions";

//sound initial parametrs
const initialSounds = {
  isSound: true,
  moveSound: new Audio("../sound1.mp3"),
  finishSound: new Audio("../sound2.mp3")
};

//sound reductor
const sounds = (state = initialSounds, action) => {
  if (action.type === CHANGE_VOL) {
    return { ...state, isSound: !state.isSound };
  }
  return state;
};

export default sounds;

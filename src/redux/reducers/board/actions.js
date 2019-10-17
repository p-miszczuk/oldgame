export const CHANGE = "CHANGE";
export const ADD_SCORE = "ADD_SCORE";
export const RESET = "RESET";

export const changePosition = values => {
  return { type: CHANGE, values };
};

export const resetPositions = () => {
  return { type: RESET };
};

export const timeUpdate = timeScore => {
  return { type: ADD_SCORE, timeScore };
};

export const resetGame = () => ({
  type: RESET
});

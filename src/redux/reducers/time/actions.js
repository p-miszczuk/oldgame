export const RESET = "RESET";
export const MILSECONDS = "MILSECONDS";
export const SECONDS = "SECONDS";
export const MINUTES = "MINUTES";
export const START = "START";
export const FINISH = "FINISH";

export const resetPositions = () => {
  return { type: RESET };
};

export const changeMilseconds = () => {
  return { type: MILSECONDS };
};

export const changeSeconds = () => {
  return { type: SECONDS };
};

export const changeMinutes = () => {
  return { type: MINUTES };
};

export const startGame = () => {
  return { type: START };
};

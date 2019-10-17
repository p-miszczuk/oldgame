import { randomPos } from "../../../data/data";
import { CHANGE, RESET } from "./actions";

let randomPosCopy = randomPos;

//random new buttons' sets
const randomValue = () => {
  const value = randomPosCopy[Math.floor(Math.random() * randomPosCopy.length)];

  randomPosCopy = randomPosCopy.filter(val => val !== value);

  return value;
};

//setting inicial buttons' board
const initialState = [
  { id: randomValue(), posX: 0, posY: 0 },
  { id: randomValue(), posX: 70, posY: 0 },
  { id: randomValue(), posX: 140, posY: 0 },
  { id: randomValue(), posX: 210, posY: 0 },
  { id: randomValue(), posX: 0, posY: 70 },
  { id: randomValue(), posX: 70, posY: 70 },
  { id: randomValue(), posX: 140, posY: 70 },
  { id: randomValue(), posX: 210, posY: 70 },
  { id: randomValue(), posX: 0, posY: 140 },
  { id: randomValue(), posX: 70, posY: 140 },
  { id: randomValue(), posX: 140, posY: 140 },
  { id: randomValue(), posX: 210, posY: 140 },
  { id: randomValue(), posX: 0, posY: 210 },
  { id: randomValue(), posX: 70, posY: 210 },
  { id: randomValue(), posX: 140, posY: 210 },
  { id: randomValue(), posX: 210, posY: 210 }
];

//buttons board reducer
const board = (state = initialState, action) => {
  if (action.type === CHANGE) {
    state = state.map(item => {
      if (item.id === action.values.id) {
        item.posX = action.values.x;
        item.posY = action.values.y;
      } else if (item.id === action.values.idElem) {
        item.posX = action.values.posX;
        item.posY = action.values.posY;
      }
      return item;
    });
  }

  if (action.type === RESET) {
    randomPosCopy = randomPos;
    state = state.map(item => {
      item.id = randomValue();
      return item;
    });
  }
  return state;
};

export default board;

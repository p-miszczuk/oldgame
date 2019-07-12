import * as flag from "../data/data";

let randomPosCopy = flag.randomPos;

//random new buttons' sets
const randomValue = () => {
    
    const value = randomPosCopy[Math.floor(Math.random() * randomPosCopy.length)];
    
    randomPosCopy = randomPosCopy.filter(val => {
      
        if (val !== value)
            return val
                  
    });
    
    return value;
}

//setting inicial buttons' board
const initialState = [
    {id: randomValue(), posX: 0, posY: 0},
    {id: randomValue(), posX: 70, posY: 0},
    {id: randomValue(), posX: 140, posY: 0},
    {id: randomValue(), posX: 210, posY: 0},
    {id: randomValue(), posX: 0, posY: 70},
    {id: randomValue(), posX: 70, posY: 70},
    {id: randomValue(), posX: 140, posY: 70},
    {id: randomValue(), posX: 210, posY: 70},
    {id: randomValue(), posX: 0, posY: 140},
    {id: randomValue(), posX: 70, posY: 140},
    {id: randomValue(), posX: 140, posY: 140},
    {id: randomValue(), posX: 210, posY: 140},
    {id: randomValue(), posX: 0, posY: 210},
    {id: randomValue(), posX: 70, posY: 210},
    {id: randomValue(), posX: 140, posY: 210},
    {id: randomValue(), posX: 210, posY: 210}
];

//button board reducer
const reductor = (state = initialState, action) => {
        
    if (action.type === flag.CHANGE) {
           state = state.map(item => {
            if (item.id === action.values.id) {
                item.posX = action.values.x;
                item.posY = action.values.y;
            }
            else if (item.id === action.values.idElem) {
                item.posX = action.values.posX;
                item.posY = action.values.posY;
            }
            return item
        });
    }

    if (action.type === flag.RESET) {
        randomPosCopy = flag.randomPos;
        state = state.map(item => {
            item.id = randomValue();
            return item;
        })
        
    } 
    return state;
}

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

    if (action.type === flag.MILSECONDS) {
        state.milseconds += 1;
        return {...state}       
    } 
    else if (action.type === flag.SECONDS) {
        state.seconds += 1;
        state.milseconds = 0;
        return {...state}
    } 
    else if (action.type === flag.MINUTES) {
        state.minutes += 1;
        state.seconds = 0;
        return {...state}
    }
    else if (action.type === flag.START) {
        state.start = true;
        return {...state}
    }
    else if (action.type === flag.FINISH) {
        state.finish = true;
        return {...state}
    }
    else if (action.type === flag.RESET) {
        state.minutes = 0;
        state.seconds = 0;
        state.milseconds = 0;
        state.start = false;
        state.finish = false;
        return {...state}
    }

    return state
}

//sound initial parametrs
const initialSounds = {
    isSound: true,
    moveSound: new Audio('../sound1.mp3'),
    finishSound: new Audio('../sound2.mp3')
}

//sound reductor
const sounds = (state = initialSounds, action) => {

    if (action.type === flag.CHANGE_VOL) {
        state.isSound = !state.isSound;
        return {...state}
    }

    return state;
}

//scores initial parametrs
const initScore = {
    nick: "",
    score: "",
    setScore: []
}

//scores initial parametrs
const scores = (state = initScore,action) => {
    
    if (action.type === flag.GET_VALUES) {
        state.setScore = action.payload;
        return {...state}
    }

    else if (action.type === flag.NICK_UPDATE) {
        state.nick = action.nick;
        return {...state}
    }

    else if (action.type === flag.ADD_SCORE) {
        state.score = action.timeScore;
        return {...state}
    }

    else if (action.type === flag.RESET) {
        state.nick = "";
        state.score = "";
        state.start = false;
        state.finish = false;
        return {...state}
    }

    else if (action.type === flag.FINISH) {
        state.start = false;
        state.finish = true;
        state.score = action.payload;
        return {...state}
    }

    return state;
}

//export all reducers
export {reductor,time,sounds,scores};
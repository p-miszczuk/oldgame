import React from "react";

const Buttons = (props) => {
    const squares = props.reductor.map(item => {
        return (
        <button 
            className="btn button position-absolute text-light button-block" 
            onClick={(e) => props.click(item,e)}
            style={{top: item.posY, left: item.posX}} 
            key={item.id}> 
                {item.id} 
        </button>
    )});

    return (
        <div className="position-relative my-2 game-table">
            {squares}
        </div>
    )
}

export default Buttons;
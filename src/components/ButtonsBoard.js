import React from "react";

const ButtonsBoard = ({ board, click }) => {
  return (
    <div className="position-relative my-2 game-table">
      {board.map(item => (
        <button
          className="btn button position-absolute text-light button-block"
          onClick={e => click(item, e)}
          style={{ top: item.posY, left: item.posX }}
          key={item.id}
        >
          {item.id}
        </button>
      ))}
    </div>
  );
};

export default ButtonsBoard;

import React from "react";
import Button from "./Buttons/Button";

const ButtonsBoard = ({ board, click }) => {
  return (
    <div className="position-relative my-2 game-table">
      {board.map(item => (
        <Button
          className="btn button position-absolute text-light button-block"
          onClick={e => click(item, e)}
          style={{ top: item.posY, left: item.posX }}
          key={item.id}
          text={item.id}
        />
      ))}
    </div>
  );
};

export default ButtonsBoard;

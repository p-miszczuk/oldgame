import React from "react";
import Timer from "./Timer";
import ButtonReset from "./ResetButton";
import Sound from "./Sound";

const InformationBoard = (props) => (
    <div className="my-4 position-relative info-board" >
        <ButtonReset reset={props.reset} />
        <Timer />
        <Sound />
    </div>
);

export default InformationBoard;
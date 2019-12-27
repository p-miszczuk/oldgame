import React from "react";
import Timer from "./Timer";
import Sound from "./Sound";
import Button from "./Buttons/Button";

const InformationBoard = ({ reset }) => (
  <div className="my-4 position-relative info-board">
    <Button onClick={reset} className="btn btn-success my-2" text="RESET" />
    <Timer />
    <Sound />
  </div>
);

export default InformationBoard;

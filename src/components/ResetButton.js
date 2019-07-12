import React from "react";

const ButtonReset = (props) => (
    <div className="my-2">
        <button 
            className="btn btn-success" 
            onClick={props.reset}>
            RESTART
        </button>
    </div>
)

export default ButtonReset;
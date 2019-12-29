import React from "react";
import Button from "./Buttons/Button";
import Input from "./Inputs/Input";

const Form = ({ submit, data, close, change }) => {
  if (data.score !== "") {
    return (
      <div className="add-scores">
        <form className="form-submit" onSubmit={submit}>
          <div>
            <Input
              name="nick"
              type="text"
              onChange={change}
              placeholder="podaj imię/nick"
              value={data.nick}
              style={{
                background: "transparent",
                border: 0,
                outline: "none",
                borderBottom: "2px solid white",
                color: "red"
              }}
              autoComplete={true}
              score={data.score}
              finish={data.finish}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px"
            }}
          >
            <Button
              style={{ minWidth: "120px" }}
              className="btn btn-success"
              type="submit"
              text="Zapisz"
            />
            <Button
              style={{ minWidth: "120px" }}
              className="btn btn-danger"
              onClick={close}
              text="Nie zapisuj"
            />
          </div>
        </form>
      </div>
    );
  }
  return null;
};

export default Form;

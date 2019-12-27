import React from "react";
import Button from "./Buttons/Button";
import Input from "./Inputs/Input";

const Form = ({ submit, data, close, change }) => {
  if (data.score !== "") {
    return (
      <div className="add-scores">
        <form className="form-submit" onSubmit={submit}>
          <Input
            name="nick"
            type="text"
            onChange={change}
            placeholder="podaj imię/nick"
            value={data.nick}
            style={{ background: "transparent" }}
            autoComplete={true}
            score={data.score}
            finish={data.finish}
          />

          <Button
            className="btn btn-success mt-4"
            type="submit"
            text="Zapisz"
          />
          <Button
            className="btn btn-danger ml-5 mt-4"
            onClick={close}
            text="Nie zapisuj"
          />
        </form>
      </div>
    );
  }
  return null;
};

export default Form;

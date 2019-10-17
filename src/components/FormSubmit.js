import React from "react";

const Form = ({ submit, data, close, change }) => {
  if (data.score !== "") {
    return (
      <div className="add-scores">
        <form className="form-submit" onSubmit={submit}>
          <p>
            <input
              name="nick"
              type="text"
              onChange={change}
              placeholder="podaj imię/nick"
              value={data.nick}
              style={{ background: "transparent" }}
              autoComplete="off"
            />
          </p>
          <p>Twój czas: {!data.finish ? "" : data.score}</p>

          <button className="btn btn-success mt-4" type="submit">
            Zapisz
          </button>
          <button className="btn btn-danger ml-5 mt-4" onClick={close}>
            Nie zapisuj
          </button>
        </form>
      </div>
    );
  } else {
    return "";
  }
};

export default Form;

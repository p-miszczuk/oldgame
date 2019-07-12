import React from "react";

const Form = (props) => {
    if (props.data.score !== "") {
        return (
            <div className="add-scores">
                <form className="form-submit" onSubmit={props.submit}>
                    <p><input
                        name="nick" 
                        type="text" 
                        onChange={props.change} 
                        placeholder="podaj imię/nick" 
                        value={props.data.nick}
                    /></p>
                    <p>Twój czas: {!props.data.finish ? "" : props.data.score}</p>
                    
                    <button className="btn btn-success mt-4" type="submit">Zapisz</button>
                    <button className="btn btn-danger ml-5 mt-4" onClick={props.close}>Nie zapisuj</button>
                </form>
            </div>
        )
    }
    else {
        return ""
    }
}

export default Form;
import React from "react";
import { connect } from "react-redux";
import {
  fetchData,
  addScores,
  nickUpdate,
  resetGame
} from "../redux/reducers/scores/actions";
import ScoreList from "./ScoreList";
import Form from "./FormSubmit";

class GameScore extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { nick, setScore, score, addScores } = this.props;

    if (nick.length < 3) {
      alert('Pole "Podaj imię/nick" powinno zawierać więcej niż 3 znaki');
      return;
    }

    const setData = {
      id: Object.values(setScore).length + 1,
      nick,
      score
    };

    addScores(setData);
  };

  handleChange = e => {
    this.props.nickUpdate(e.target.value);
  };

  handleClose = () => {
    this.props.closeModal();
  };

  componentDidMount() {
    this.props.getScores();
  }

  render() {
    const { setScore } = this.props;
    return (
      <div className="scores-table">
        <Form
          data={this.props}
          change={this.handleChange}
          submit={this.handleSubmit}
          close={this.handleClose}
        />
        <ScoreList listItem={setScore} />
      </div>
    );
  }
}

const mapStateToProps = ({ scores }) => {
  return { ...scores };
};

const mapDispatchToProps = {
  getScores: fetchData,
  addScores,
  nickUpdate,
  closeModal: resetGame
};

const GameScores = connect(mapStateToProps, mapDispatchToProps)(GameScore);

export default GameScores;

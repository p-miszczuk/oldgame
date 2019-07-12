import React from "react";
import { connect } from "react-redux";
import * as actions from '../data/actions';
import ScoreList from './ScoreList';
import Form from './FormSubmit';
import {RESET} from '../data/data';

const mapStateToProps = state => {
    return {...state.scores}
}

const mapDispatchToProps = dispatch => {
    
    return {
        getScores: () => dispatch(actions.Fetch()),
        addScores: (item) => dispatch(actions.AddScore(item)),
        updateNick: (nick) => dispatch(actions.nickUpdate(nick)),
        closeModal: () => dispatch({type: RESET})
    }
}

class GameScore extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
       
        if (this.props.nick.length < 3) {
            alert('Pole "Podaj imię/nick" powinno zawierać więcej niż 3 znaki');
            return false;
        }

        this.setData = {
            id: Object.values(this.props.setScore).length + 1,
            nick: this.props.nick,
            score: this.props.score 
        }
        
        this.props.addScores(this.setData);
    }

    handleChange = (e) => {
        this.props.updateNick(e.target.value);
    }

    handleClose = () => {
        this.props.closeModal();
    }

    componentDidMount() {
        this.props.getScores();
    }
    
    render() { 
        return (
            <div className="scores-table">
                <Form
                    data={this.props}  
                    change={this.handleChange}
                    submit={this.handleSubmit}
                    close={this.handleClose}
                />
                <ScoreList listItem={this.props.setScore} />
            </div>
        )
    }
}

const GameScores = connect(mapStateToProps,mapDispatchToProps)(GameScore);

export default GameScores;
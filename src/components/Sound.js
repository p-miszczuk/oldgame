import {connect} from "react-redux";
import React from "react";
import sound from '../images/sound.gif';
import mute from '../images/mute.gif';

const mapStateToProps = ({sounds}) => {
    return {...sounds}
}

const mapDispatchToProps = (dispatch) => {
    return {
        volume: (val) => dispatch({type: "CHANGE_VOL"})
    }
}

class SoundsGame extends React.Component {

    handleVolume = () => {
        // const {moveSound,finishSound} = this.props.sounds;
        this.props.volume();
        if (!this.props.isSound) {
            this.props.moveSound.volume = 1;
            this.props.finishSound.volume = 1;
        } else {
            this.props.moveSound.volume = 0;
            this.props.finishSound.volume = 0;
        }
    }

    render() {
        return (
            <div className="mt-2 mb-4 position-absolute text-center sound"><img onClick={this.handleVolume} src={this.props.isSound ? sound : mute} className="image" title="Turn on/off sound" /></div>
        )
    }
}

const Sound = connect(mapStateToProps,mapDispatchToProps)(SoundsGame);
export default Sound;
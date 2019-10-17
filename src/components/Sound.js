import { connect } from "react-redux";
import React from "react";
import sound from "../images/sound.gif";
import mute from "../images/mute.gif";
import { changeVolume } from "../redux/reducers/sound/actions";

class Sound extends React.Component {
  handleVolume = () => {
    const { changeVolume, isSound, moveSound, finishSound } = this.props;
    changeVolume();

    if (!isSound) {
      moveSound.volume = 1;
      finishSound.volume = 1;
    } else {
      moveSound.volume = 0;
      finishSound.volume = 0;
    }
  };

  render() {
    const { isSound } = this.props;
    return (
      <div className="mt-2 mb-4 position-absolute text-center sound">
        <img
          onClick={this.handleVolume}
          src={isSound ? sound : mute}
          className="image"
          title="Turn on/off sound"
          alt="sound icon"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ sounds }) => ({
  isSound: sounds.isSound,
  finishSound: sounds.finishSound,
  moveSound: sounds.moveSound
});

const mapDispatchToProps = {
  changeVolume
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sound);

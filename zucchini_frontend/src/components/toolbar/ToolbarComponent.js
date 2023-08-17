import React, { Component } from "react";
import "./ToolbarComponent.css";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";

import IconButton from "@material-ui/core/IconButton";

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  render() {
    const localUser = this.props.user;
    return (
      <div className="buttonsContent">
        <IconButton
          color="inherit"
          className="navButton"
          id="navMicButton"
          onClick={this.micStatusChanged}
        >
          {localUser !== undefined && localUser.isAudioActive() ? (
            <Mic />
          ) : (
            <MicOff color="secondary" />
          )}
        </IconButton>

        <IconButton
          color="inherit"
          className="navButton"
          id="navCamButton"
          onClick={this.camStatusChanged}
        >
          {localUser !== undefined && localUser.isVideoActive() ? (
            <Videocam />
          ) : (
            <VideocamOff color="secondary" />
          )}
        </IconButton>

        <IconButton
          color="inherit"
          className="navButton"
          onClick={this.toggleFullscreen}
        >
          {localUser !== undefined && this.state.fullscreen ? (
            <FullscreenExit />
          ) : (
            <Fullscreen />
          )}
        </IconButton>
      </div>
    );
  }
}

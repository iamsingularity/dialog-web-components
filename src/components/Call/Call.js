/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallWrapperProps as Props } from './types';
import React, { PureComponent } from 'react';
import CallChat from './CallChat';
import CallWindow from './CallWindow';

export type State = {
  duration: number
};

class Call extends PureComponent {
  props: Props;
  state: State;
  timer: ?number;

  constructor(props: Props) {
    super(props);

    this.state = {
      duration: 0
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.call && nextProps.call) {
      const { state } = this.props.call;
      const { state: nextState } = nextProps.call;

      if (nextState === 'in_progress' && state !== 'in_progress') {
        this.setTimer();
      } else if (state === 'in_progress' && nextState !== 'in_progress') {
        this.clearTimer();
      }
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  handleEnd = (): void => {
    if (this.props.id) {
      this.props.onEnd(this.props.id);
    }
  };

  handleAnswer = (): void => {
    if (this.props.id) {
      this.props.onAnswer(this.props.id);
    }
  };

  handleMuteToggle = (): void => {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onMuteToggle(id, !call.isMuted);
    }
  };

  handleCameraToggle = (): void => {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onCameraToggle(id, !call.isCameraOn);
    }
  };

  handleScreenShareToggle = (): void => {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onScreenShareToggle(id, !call.isScreenSharingOn);
    }
  };

  setTimer(): void {
    this.clearTimer();

    this.setState({ duration: 0 });
    this.timer = setInterval(
      () => {
        this.setState((prevState) => {
          return {
            duration: prevState.duration + 1
          };
        });
      },
      1000
    );
  }

  clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render(): ?React.Element<any> {
    const { id, call, caller, small, isVideoEnabled, isScreenSharingEnabled } = this.props;
    const { duration } = this.state;

    if (!id || !call || !caller) {
      return null;
    }

    const ChildCall = small ? CallWindow : CallChat;

    return (
      <ChildCall
        call={call}
        caller={caller}
        duration={duration}
        onEnd={this.handleEnd}
        onAnswer={this.handleAnswer}
        onResize={this.props.onResize}
        onMuteToggle={this.handleMuteToggle}
        onCameraToggle={isVideoEnabled ? this.handleCameraToggle : null}
        onScreenShareToggle={isScreenSharingEnabled ? this.handleScreenShareToggle : null}
      />
    );
  }
}

export default Call;

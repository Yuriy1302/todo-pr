import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  static propTypes = {
    completed: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timeStart: 0,
      timeInt: 0,
      timeResult: 0,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  tick = () => {
    const { timeStart, timeInt } = this.state;
    this.setState({
      timeResult: timeInt + (Number(Date.now()) - timeStart),
    });
  };

  startTimer = () => {
    const { timeResult } = this.state;
    clearTimeout(this.intervalID);
    this.setState({
      timeInt: timeResult,
      timeStart: Number(Date.now()),
    });

    const loop = () => {
      this.intervalID = setTimeout(() => {
        this.tick();
        loop();
      }, 1000);
    };
    loop();
  };

  stopTimer = () => {
    const { timeResult } = this.state;
    this.setState({
      timeInt: timeResult,
    });
    clearTimeout(this.intervalID);
  };

  transformMsToTime = (ms) => {
    let sec = Math.floor((ms / 1000) % 60);
    let min = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    sec = sec < 10 ? `0${sec}` : sec;
    min = min < 10 ? `0${min}` : min;

    if (ms >= 3600000) {
      hours = hours < 10 ? `0${hours}` : hours;
      return `${hours}:${min}:${sec}`;
    }

    return `${min}:${sec}`;
  };

  render() {
    const { completed } = this.props;
    const { timeResult } = this.state;

    if (completed) {
      clearTimeout(this.intervalID);
    }

    return (
      <span className="description">
        <button type="button" className="icon icon-play" onClick={this.startTimer} aria-label="Start timer" />
        <button type="button" className="icon icon-pause" onClick={this.stopTimer} aria-label="Stop timer" />
        {this.transformMsToTime(timeResult)}
      </span>
    );
  }
}

export default Timer;

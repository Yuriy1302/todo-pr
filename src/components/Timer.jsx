import React from 'react';

class Timer extends React.Component {

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
    const { timeResult } = this.props;

    return (
      <span className="description">
        <button type="button" className="icon icon-play" onClick={this.props.startTimer} aria-label="Start timer" />
        <button type="button" className="icon icon-pause" onClick={this.props.stopTimer} aria-label="Stop timer" />
        {this.transformMsToTime(timeResult)}
      </span>
    );
  }
}

export default Timer;

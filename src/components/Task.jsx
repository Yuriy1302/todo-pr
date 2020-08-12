import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import PropTypes from 'prop-types';

import Timer from './Timer';

class Task extends React.Component {
  static propTypes = {
    task: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onSaveEditing: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editValue: `${props.task.text}`,
      timeStart: 0,
      timeTemp: 0,
      timeResult: 0,

    };
  }

  componentDidMount() {
    const { timer } = this.props.task;
    this.setState({
      timeResult: timer
    })
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
    const { updateTimer, task } = this.props;
    updateTimer(task.id, this.state.timeResult);
  }

  tick = () => {
    const { timeStart, timeTemp } = this.state;
    this.setState({
      timeResult: timeTemp + (Number(Date.now()) - timeStart),
    });
  };

  startTimer = () => {
    const { timeResult } = this.state;
    clearTimeout(this.intervalID);
    this.setState({
      timeTemp: timeResult,
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
    clearTimeout(this.intervalID);
    this.setState({
      timeTemp: timeResult,
    });
  };

  onChange = (event) => {
    event.preventDefault();
    this.setState({ editValue: event.target.value });
  };

  onSaveTask = (event) => {
    event.preventDefault();
    const title = event.currentTarget.value;
    const id = event.currentTarget.name;
    const { onSaveEditing } = this.props;
    onSaveEditing(id, title);
    this.setState((state) => {
      const { editMode } = state;
      return { editMode: !editMode };
    });
  };

  onTaskSubmit = (id, title) => (event) => {
    event.preventDefault();
    const { onSaveEditing } = this.props;
    onSaveEditing(id, title);
    this.setState((state) => {
      const { editMode } = state;
      return { editMode: !editMode };
    });
  };

  onEditeMode = () => {
    this.setState((state) => {
      const { editMode } = state;
      return { editMode: !editMode };
    });
  };

  renderEditInput = (task, editValue) => {
    return (
      <form onSubmit={this.onTaskSubmit(task.id, editValue)}>
        <input
          type="text"
          className="edit"
          name={task.id}
          value={editValue}
          onChange={this.onChange}
          onBlur={this.onSaveTask}
        />
      </form>
    );
  };

  render() {
    const { task, onCompleted, onDeleted } = this.props;

    const { editMode, editValue } = this.state;
    
    if (task.isCompleted) {
      clearTimeout(this.intervalID);
    }

    let classNames = 'completed';
    if (task.state === 'active') {
      classNames = '';
    }

    if (editMode) {
      classNames = 'editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" name={task.id} checked={task.isCompleted} onChange={onCompleted} />
          <label>
            <span className="title">{task.text}</span>
            <Timer timeResult={this.state.timeResult}
                  startTimer={this.startTimer}
                  stopTimer={this.stopTimer}
            />
            <span className="description">
              created&nbsp;
              {formatDistanceToNow(task.created, { includeSeconds: true })}
              &nbsp;ago
            </span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            name={task.id}
            onClick={this.onEditeMode}
            aria-label="Edite task"
          />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete task" />
        </div>
        {editMode && this.renderEditInput(task, editValue)}
      </li>
    );
  }
}

export default Task;

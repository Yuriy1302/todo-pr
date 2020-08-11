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
    };
  }

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
            <Timer completed={task.isCompleted} />
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

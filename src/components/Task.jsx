import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import PropTypes from 'prop-types';

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

  onSaveTaskSubmit = (id, title) => (event) => {
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

  render() {
    const { task, onCompleted, onDeleted } = this.props;

    const { editMode, editValue } = this.state;

    let classNames = '';
    if (task.state === 'finished') {
      classNames = 'completed';
    } else {
      classNames = '';
    }

    if (editMode) {
      classNames = 'editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" name={task.id} checked={task.isChecking} onChange={onCompleted} />
          <label>
            <span className="description">{task.text}</span>
            <span className="created">
              created&nbsp;
              {formatDistanceToNow(new Date(task.created), { includeSeconds: true })}
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
        {editMode && (
          <form onSubmit={this.onSaveTaskSubmit(task.id, editValue)}>
            <input
              type="text"
              className="edit"
              name={task.id}
              value={editValue}
              onChange={this.onChange}
              onBlur={this.onSaveTask}
            />
          </form>
        )}
      </li>
    );
  }
}

export default Task;

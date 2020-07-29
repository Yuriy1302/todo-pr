import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

class TaskList extends React.Component {
  static defaultProps = {
    filterState: 'all',
  };

  static propTypes = {
    filterState: PropTypes.string,
    tasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
    onSaveEditing: PropTypes.func.isRequired,
  };

  filteredTasks = (tasks, filterState) => {
    const newTasksList = filterState === 'all' ? tasks : tasks.filter((task) => task.state === filterState);
    return newTasksList;
  };

  renderTask = (task) => {
    const { onDeleted, onCompleted, onSaveEditing } = this.props;
    return (
      <Task
        onDeleted={onDeleted(task.id)}
        onCompleted={onCompleted}
        task={task}
        key={task.id}
        onSaveEditing={onSaveEditing}
      />
    );
  };

  render() {
    const { tasksList, filterState } = this.props;
    const tasks = this.filteredTasks(tasksList, filterState);
    return <ul className="todo-list">{tasks.length > 0 && tasks.map(this.renderTask)}</ul>;
  }
}

export default TaskList;

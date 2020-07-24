import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

class TaskList extends React.Component {
  static defaultProps = {
    onMarkCompleted: () => {},
    filterState: 'all',
  }
  
  static propTypes = {
    tasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onMarkCompleted: PropTypes.func,
  }

  filteredTasks = (tasks, filterState) => {
    const newTasksList = filterState === 'all' ? tasks : tasks.filter((t) => t.state === filterState);
    return newTasksList;
  }

  render() {
    const { tasksList, onDeleted, onMarkCompleted, filterState } = this.props;
    const tasks = this.filteredTasks(tasksList, filterState);
    return (
      <ul className="todo-list">
        {
          tasks.length > 0 &&
            tasks.map((task) => {
              return (
                <Task onDeleted={onDeleted(task.id)}
                    onMarkCompleted={onMarkCompleted}
                    task={task}
                    key={task.id}
                    onSaveEditing={this.props.onSaveEditing} />
              )
          })
        }
      </ul>
    );
  }
};

export default TaskList;


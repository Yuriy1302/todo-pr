import React from 'react';

import Task from './Task';

class TaskList extends React.Component {
  /* static defaultProps = {
    filterName: 'all'
  } */
  /* constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }
  } */

  



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

/* class TaskList extends React.Component {
  
  render() {
    const { tasksList, onDeleted, onMarkCompleted } = this.props;
    
    return (
      <ul className="todo-list">
        {
          tasksList.length > 0 &&
            tasksList.map((task) => {
              return (
                <Task onDeleted={onDeleted(task.id)}
                    onMarkCompleted={onMarkCompleted}
                    task={task}
                    key={task.id} />
              )
          })
        }
      </ul>
    );
  }
}; */
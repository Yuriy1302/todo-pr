import React from 'react';

import Task from './Task';

const TaskList = (props) => {
  return (
    <ul className="todo-list">
      {
        props.tasksList.length > 0 &&
          props.tasksList.map((task) => {
            return (
              <Task onDeleted={props.onDeleted(task.id)}
                  onMarkCompleted={props.onMarkCompleted(task.id)}
                  task={task}
                  key={task.id} />
            )
        })
      }
    </ul>
  );
};

export default TaskList;
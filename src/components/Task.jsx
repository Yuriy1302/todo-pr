import React from 'react';

const Task = (props) => {
    const { task } = props;
    //console.log('task.state', task.state);
    
    return (
        <li className={task.state}>
            <div className="view">
              <input className="toggle"
                    type="checkbox"

                    checked={props.checks}
                    
                    onChange={props.onMarkCompleted} />
              <label>
                  <span className="description">{task.text}</span>
                  <span className="created">created 17 seconds ago</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy" onClick={props.onDeleted}></button>
            </div>
        </li>
    );
};

export default Task;
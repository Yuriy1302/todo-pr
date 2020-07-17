import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Task = (props) => {
    const { task } = props;
        
    return (
        <li className={task.state === 'finished' ? 'completed' : ''}>
            <div className="view">
              <input className="toggle"
                    type="checkbox"
                    name={task.id}
                    checked={task.isChecking}
                    onChange={props.onMarkCompleted} />
              <label>
                  <span className="description">{task.text}</span>
                  <span className="created">
                      created&nbsp;
                      {formatDistanceToNow(
                          new Date(task.created),
                          {includeSeconds: true})}
                        &nbsp;ago</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy" onClick={props.onDeleted}></button>
            </div>
        </li>
    );
};

export default Task;
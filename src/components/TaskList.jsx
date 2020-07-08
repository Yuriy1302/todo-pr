import React from 'react';

import Task from './Task';

const TaskList = ({ stateTask, text }) => {

    return (
        <ul className="todo-list">
            <Task state={ stateTask[0].state } text={text[0]} />
            <Task text={text[1]} />
            <Task text={text[2]} />
        </ul>
    );
};

export default TaskList;
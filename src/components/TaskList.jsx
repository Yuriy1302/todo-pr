import React from 'react';

import Task from './Task';

const TaskList = () => {
    
    return (
        <ul className="todo-list">
            <Task text="Задача 1" />
            <Task text="Задача 2" />
            <Task text="Задача 3" />
        </ul>
    );
};

export default TaskList;
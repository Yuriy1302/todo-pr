import React from 'react';

const NewTaskForm = (props) => {
  return (
    <form onSubmit={props.onSubmitTask}>
      <input className="new-todo"
            onChange={props.onChangeValue}
            value={props.valueTask}
            placeholder="What needs to be done?"
            autoFocus />
    </form>
  );
};

export default NewTaskForm;
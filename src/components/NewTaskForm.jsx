import React from 'react';

const NewTaskForm = (props) => {
  return (
    <form onSubmit={props.onHandleSubmit}>
      <input className="new-todo"
            onChange={props.onHandleChange}
            value={props.newValue}
            placeholder="What needs to be done?"
            autoFocus />
    </form>
  );
};

export default NewTaskForm;
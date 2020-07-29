import React from 'react';

import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const { onSubmitTask, onChangeValue, valueTask } = props;
  return (
    <form onSubmit={onSubmitTask}>
      <input
        className="new-todo"
        onChange={onChangeValue}
        value={valueTask}
        placeholder="What needs to be done?"
        required
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onSubmitTask: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  valueTask: PropTypes.string.isRequired,
};

export default NewTaskForm;

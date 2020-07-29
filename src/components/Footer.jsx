import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from './TaskFilter';

const Footer = (props) => {
  const { countItems, filterState, onFilterNameChange, onClearCompleted } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{countItems} items left</span>
      <TaskFilter filterState={filterState} onFilterNameChange={onFilterNameChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  countItems: PropTypes.number.isRequired,
  filterState: PropTypes.string.isRequired,
  onFilterNameChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;

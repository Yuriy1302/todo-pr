import React from 'react';

import PropTypes from 'prop-types';

const filters = [
  ['all', 'All'],
  ['active', 'Active'],
  ['finished', 'Completed'],
];

class TaskFilter extends React.Component {
  static propTypes = {
    filterState: PropTypes.string.isRequired,
    onFilterNameChange: PropTypes.func.isRequired,
  };

  onFilterSelection = (event) => {
    event.preventDefault();
    const { onFilterNameChange } = this.props;
    onFilterNameChange(event.target.name);
  };

  renderFilterButtons = ([filterName, name], filterState) => {
    const classNames = filterName === filterState ? 'selected' : '';
    return (
      <li key={filterName}>
        <button
          type="button"
          className={classNames}
          name={filterName}
          data-test={`task-filter-${filterName}`}
          onClick={this.onFilterSelection}
        >
          {name}
        </button>
      </li>
    );
  };

  render() {
    const { filterState } = this.props;
    return <ul className="filters">{filters.map((el) => this.renderFilterButtons(el, filterState))}</ul>;
  }
}

export default TaskFilter;

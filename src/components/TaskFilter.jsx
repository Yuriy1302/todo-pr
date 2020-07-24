import React from 'react';

const filters = [['all', 'All'], ['active', 'Active'], ['finished', 'Completed']];

class TaskFilter extends React.Component {
	
	static defaultProps = {
		filterState: () => {},
	}
	
	constructor(props) {
		super(props);
		this.state ={
			isClick: this.props.filterState,
		}
	}
	
	onClick = (e) => {
		e.preventDefault();
		this.props.onFilterNameChange(e.target.name);
	}	

	renderFilterButtons = ([filterName, name], filterState) => {
		const classNames = filterName === filterState ? 'selected' : '';
		return (
			<li key={filterName}>
				<button type="button"
								className={classNames}
								name={filterName}
								data-test={`task-filter-${filterName}`}
								onClick={this.onClick}
				>
					{name}
				</button>
			</li>
		);
	}

	render() {
		const filterState = this.props.filterState;
		return (
			<ul className="filters">
				{filters.map(el => this.renderFilterButtons(el, filterState))}
			</ul>
		);
	}
};

export default TaskFilter;


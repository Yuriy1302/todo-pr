import React from 'react';

const filters = [['all', 'All'], ['active', 'Active'], ['finished', 'Completed']];

class TaskFilter extends React.Component {
	
	static filterName = this.props;
	
	constructor(props) {
		super(props);
		this.state ={
			isClick: this.props.filterState,
		}
	}

	
	
	
	/* onClick = (e) => {
		e.preventDefault();
		const name = e.target.name;
		this.setState({isClick: name});
	} */

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
		//console.log('in TaskFilter filterName ', this.props.filterName)
		//console.log('in TaskFilter isClick ', this.state.isClick)
		const filterState = this.props.filterState;
		return (
			<ul className="filters">
				{filters.map(el => this.renderFilterButtons(el, filterState))}
			</ul>
		);
	}
};

export default TaskFilter;

/* class TaskFilter extends React.Component {
	
	render() {

		return (
			<ul className="filters">
				<li>
					<button className="selected">All</button>
				</li>
				<li>
					<button>Active</button>
				</li>
				<li>
					<button>Completed</button>
				</li>
			</ul>
		);
	}
}
 */	





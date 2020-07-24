import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from './TaskFilter';

const Footer = (props) => {
	return (
		<footer className="footer">
			<span className="todo-count">
					{props.countItems} items left
			</span>
			<TaskFilter filterState={props.filterState}
						onFilterNameChange={props.onFilterNameChange}/>
			<button className="clear-completed"
					onClick={props.onClearCompleted}>
					Clear completed</button>
		</footer>
	);
};

Footer.defaultProps = {
	filterState: () => {},
	onFilterNameChange: () => {},
	onClearCompleted: () => {},
}

Footer.propTypes = {
	countItems: PropTypes.number
}

export default Footer;
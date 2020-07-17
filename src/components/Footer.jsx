import React from 'react';

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

export default Footer;
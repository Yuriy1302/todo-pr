import React from 'react';
import { formatDistanceToNow } from 'date-fns';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			editValue: `${props.task.text}`
		}
	}

	onChange = (e) => {
		e.preventDefault();
		this.setState({ editValue: e.target.value });
	}

	onSaveTask = (e) => {
		const title = e.currentTarget.value;
		const id = e.currentTarget.name;
		this.props.onSaveEditing(id, title);
		this.setState({ editMode: !this.state.editMode });

	}

	onEditeMode = () => {
		this.setState({ editMode: !this.state.editMode });
	}
	
	render() {
		const { task } = this.props;
		
		let classNames = '';
		if (task.state === 'finished') {
			classNames = 'completed';
		} else {
			classNames = ''
		}

		if (this.state.editMode) {
			classNames = 'editing';
		}
        
    return (
        <li className={classNames}>
            <div className="view">
              <input className="toggle"
                    type="checkbox"
                    name={task.id}
                    checked={task.isChecking}
                    onChange={this.props.onMarkCompleted} />
              <label>
                  <span className="description">
                      {task.text}
                  </span>
                  <span className="created">
                      created&nbsp;
                      {formatDistanceToNow(
                          new Date(task.created),
                          {includeSeconds: true})}
                        &nbsp;ago</span>
              </label>
              <button className="icon icon-edit" name={task.id} onClick={this.onEditeMode}></button>
              <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
            </div>
						{this.state.editMode && 
							<input type="text"
										className="edit"
										name={task.id}
										value={this.state.editValue}
										onChange={this.onChange}
										onBlur={this.onSaveTask}
										autoFocus />
						}
        </li>
		);
	}
};

export default Task;
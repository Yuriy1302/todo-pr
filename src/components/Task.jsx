import React from 'react';

class Task extends React.Component {
    constructor() {
        super();
        this.state = {
            completed: false,
        };
    }

    onClickCompleted = () => {
        const { completed } = this.state;
        this.setState({
            completed: !completed
        });
    }

    render() {
        const { text } = this.props;
        const { completed } = this.state;
        let completedClass = '';
        if (completed) {
            completedClass = 'completed';
        }
        return (
            <li className={completedClass}>
                <div className="view">
                <input className="toggle" type="checkbox" onClick={this.onCompletedTask} />
                <label>
                    <span className="description" onClick={this.onClickCompleted}>{text}</span>
                    <span className="created">created 17 seconds ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
                </div>
            </li>
        );
    }
};

export default Task;
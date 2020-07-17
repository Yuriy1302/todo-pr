import React from 'react';
import _ from 'lodash';

import NewTaskForm from './NewTaskForm';
import Footer from './Footer';
import TaskList from './TaskList';

class App extends React.Component {
  /* static defaultProps = {
    filterName: 'all'
  } */

  constructor(props) {
    super(props);
    this.state = {
      valueTask: '',
      tasksList: [],
      filterState: 'all'
    }
  }

  // ГОТОВЫЕ ФУНКЦИИ - начало
  onChangeValue = (event) => {
    event.preventDefault();
    this.setState({ valueTask: event.target.value });
  }

  onSubmitTask = (event) => {
    event.preventDefault();
    const { valueTask } = this.state;
    const newTask = {
      id: _.uniqueId(),
      text: valueTask,
      state: 'active',
      isChecking: false,
      created: Date.now()
    };
    this.setState(({ tasksList }) => {
      const newList = [ newTask, ...tasksList ];
      return {
        tasksList: newList,
        valueTask: ''
      };
    });
  }

  onMarkCompleted = (event) => {
    const name = event.target.name;
    this.setState(({tasksList}) => {
      const index = tasksList.findIndex((task) => task.id === name);
      const oldTask = tasksList[index];
      const newTask = { 
        ...oldTask,
        state: oldTask.state === 'active' ? 'finished' : 'active',
        isChecking: !oldTask.isChecking
      };
      const newList = [
        ...tasksList.slice(0, index),
        newTask,
        ...tasksList.slice(index + 1)
      ];
      return { tasksList: newList };
    });
  };

  onDeleted = (currentId) => (event) => {
    event.preventDefault();
    this.setState(({tasksList}) => {
      const newList = tasksList.filter((task) => task.id !== currentId);
      return { tasksList: newList };
    });
  };

  onClearCompleted = () => {
    this.setState(({tasksList}) => {
      const newList = tasksList.filter((task) => task.state === 'active');
      return { tasksList: newList };
    });
  };

  onFilterNameChange = (name) => {
    this.setState({filterState: name});
	}


  // ГОТОВЫЕ ФУНКЦИИ - конец


  render() {
    const { tasksList } = this.state;
    const countItems = tasksList.filter((task) => task.state === 'active').length;

    
    
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
            <NewTaskForm onChangeValue={this.onChangeValue}
                        onSubmitTask={this.onSubmitTask}
                        valueTask={this.state.valueTask} />
        </header>
        <section className="main">
          <TaskList tasksList={this.state.tasksList}
                    onDeleted={this.onDeleted}
                    onMarkCompleted={this.onMarkCompleted}
                    filterState={this.state.filterState} />
          <Footer countItems={countItems}
                  onClearCompleted={this.onClearCompleted}
                  filterState={this.state.filterState}
                  onFilterNameChange={this.onFilterNameChange} />
        </section>  
      </section>
    );
  }
};

export default App;
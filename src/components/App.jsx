import React from 'react';
import uniqueId from 'lodash/uniqueId';

import NewTaskForm from './NewTaskForm';
import Footer from './Footer';
import TaskList from './TaskList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueTask: '',
      tasksList: [],
      filterState: 'all',
    };
  }

  onChangeValue = (event) => {
    event.preventDefault();
    this.setState({ valueTask: event.target.value });
  };

  onSubmitTask = (event) => {
    event.preventDefault();
    const { valueTask } = this.state;
    const newTask = {
      id: uniqueId(),
      text: valueTask,
      state: 'active',
      isCompleted: false,
      created: Date.now(),
    };
    this.setState(({ tasksList }) => {
      const newList = [newTask, ...tasksList];
      return {
        tasksList: newList,
        valueTask: '',
      };
    });
  };

  onCompleted = (event) => {
    const { name } = event.target;
    this.setState(({ tasksList }) => {
      const index = tasksList.findIndex((task) => task.id === name);
      const oldTask = tasksList[index];
      const newTask = {
        ...oldTask,
        state: oldTask.state === 'active' ? 'finished' : 'active',
        isCompleted: !oldTask.isCompleted,
      };
      const newList = [...tasksList.slice(0, index), newTask, ...tasksList.slice(index + 1)];
      return { tasksList: newList };
    });
  };

  onDeleted = (currentId) => (event) => {
    event.preventDefault();
    this.setState(({ tasksList }) => {
      const newList = tasksList.filter((task) => task.id !== currentId);
      return { tasksList: newList };
    });
  };

  onClearCompleted = () => {
    this.setState(({ tasksList }) => {
      const newList = tasksList.filter((task) => task.state === 'active');
      return { tasksList: newList };
    });
  };

  onFilterNameChange = (name) => {
    this.setState({ filterState: name });
  };

  onSaveEditing = (id, title) => {
    this.setState(({ tasksList }) => {
      const index = tasksList.findIndex((task) => task.id === id);
      const oldTask = tasksList[index];
      const newTask = {
        ...oldTask,
        text: title,
      };
      const newList = [...tasksList.slice(0, index), newTask, ...tasksList.slice(index + 1)];
      return { tasksList: newList };
    });
  };

  render() {
    const { tasksList, valueTask, filterState } = this.state;
    const countItems = tasksList.filter((task) => task.state === 'active').length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onChangeValue={this.onChangeValue} onSubmitTask={this.onSubmitTask} valueTask={valueTask} />
        </header>
        <section className="main">
          <TaskList
            tasksList={tasksList}
            onDeleted={this.onDeleted}
            onCompleted={this.onCompleted}
            filterState={filterState}
            onSaveEditing={this.onSaveEditing}
          />
          <Footer
            countItems={countItems}
            onClearCompleted={this.onClearCompleted}
            filterState={filterState}
            onFilterNameChange={this.onFilterNameChange}
          />
        </section>
      </section>
    );
  }
}

export default App;

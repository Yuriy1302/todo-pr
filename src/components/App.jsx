import React from 'react';
import _ from 'lodash';

//import Header from './Header';
import NewTaskForm from './NewTaskForm';
import Footer from './Footer';
import TaskList from './TaskList';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        newValue: '',
        tasksList: [],
      }
    }

    onHandleChange = (event) => {
      event.preventDefault();
      this.setState({ newValue: event.target.value });
    }

    onHandleSubmit = (event) => {
      event.preventDefault();
      const tasks = this.state.tasksList;
      const newTask = { id: _.uniqueId(), text: this.state.newValue, state: 'active', checked: false };
      this.setState({ tasksList: [newTask, ...tasks] });
      this.setState({ newValue: ''});
    }

    onDeleted = (currentId) => (e) => {
      e.preventDefault();
      const { tasksList } = this.state;
      //console.log('taskList ', tasksList);
      const newTaskList = tasksList.filter((task) => task.id !== currentId);
      this.setState({ tasksList: newTaskList });
    }



    onMarkCompleted = (checkId) => (e) => {
      e.preventDefault();
      console.log(checkId);

    };



    render() {

      return (
            <div>
                <header className="header">
                    <h1>Todos</h1>
                    <NewTaskForm onHandleChange={this.onHandleChange}
                                onHandleSubmit={this.onHandleSubmit}
                                newValue={this.state.newValue} />
                </header>
                <TaskList tasksList={this.state.tasksList}
                          onDeleted={this.onDeleted}
                          
                          onMarkCompleted={this.onMarkCompleted} />
                <Footer />
            </div>
        );
    }
};

export default App;
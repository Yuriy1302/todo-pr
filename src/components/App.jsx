import React from 'react';

//import Header from './Header';
import NewTaskForm from './NewTaskForm';
import Footer from './Footer';
import TaskList from './TaskList';

class App extends React.Component {

    render() {
    
        const stateTask = [
            { state: 'completed' },
            { state: 'editing' },
        ];
    
        const text = [
            'Completed task',
            'Editing task',
            'Active task'
        ];

        return (
            <div>
                <header className="header">
                    <h1>Todos</h1>
                    <NewTaskForm />
                </header>
                <TaskList stateTask={stateTask} text={text} />
                <Footer />
            </div>
        );
    }
};

export default App;
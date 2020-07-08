import React from 'react';
import NewTaskForm from './NewTaskForm';

const Header = () => {
    return (
        <header className="header">
            <h1>Todos</h1>
            <NewTaskForm />
        </header>
    );
};

export default Header;
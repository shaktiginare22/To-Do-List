import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <TodoList />
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2 text-sm">
        <p>© 2025 Created by Shakti Ginare | Credit to @Shaktiginare22</p>
      </footer>
    </div>
  );
}

export default App;

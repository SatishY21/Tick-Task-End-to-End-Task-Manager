import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// The 'user' prop is passed down from App.jsx
function TodoListPage({ user, onLogout }) { // Assuming you add onLogout back for the header
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Define the API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL;

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    try {
      // Use the apiUrl variable in the fetch call
      const response = await fetch(`${apiUrl}/api/todos/${user.id}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // This effect now correctly handles both login and logout states
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      fetchTodos();
    } else {
      setTodos([]);
      setIsLoading(false);
    }
  }, [user]);

  // Handler for adding a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    // Use the apiUrl variable
    const response = await fetch(`${apiUrl}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodoText, userId: user.id }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };
  
  // Handler for toggling a todo's completed status
  const handleToggleComplete = async (todoId) => {
    // Use the apiUrl variable
    const response = await fetch(`${apiUrl}/api/todos/${todoId}`, {
      method: 'PUT',
    });
    const updatedTodo = await response.json();
    setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
  };
  
  // Handler for deleting a todo
  const handleDeleteTodo = async (todoId) => {
    // Use the apiUrl variable
    await fetch(`${apiUrl}/api/todos/${todoId}`, {
        method: 'DELETE',
    });
    setTodos(todos.filter(todo => todo._id !== todoId));
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      
    

      {/* Dynamic Content */}
      {user ? (
        // Renders the todo manager if user is logged in
        <>
          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="flex gap-2 mt-6">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Add
            </button>
          </form>

          {/* Todo List */}
          <div className="mt-6">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading tasks...</p>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li
                    key={todo._id}
                    className="flex items-center p-3 bg-gray-50 rounded-md group"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo._id)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className={`flex-grow ml-3 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {todo.text}
                    </span>
                    <button 
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            { !isLoading && todos.length === 0 && (
              <p className="text-center text-gray-500 mt-8">You have no tasks. Add one above! ✨</p>
            )}
          </div>
        </>
      ) : (
        // Renders a public prompt if user is not logged in
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700">Please log in to manage your tasks.</h2>
          <p className="text-gray-500 mt-2">Create an account or sign in to start organizing your life!</p>
        </div>
      )}
    </div>
  );
}

export default TodoListPage;
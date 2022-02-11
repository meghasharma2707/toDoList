import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const favTodo = id => {
    let takeToDo;
    let favTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isFav = !todo.isFav;
        takeToDo = todo;
      }
      return todo;
    });
    favTodos = favTodos.filter(todo => todo !== takeToDo);
    if(takeToDo.isFav) {
      const newTodo = [takeToDo, ...favTodos];
      setTodos(newTodo);
    } else {
      const newTodo = [...favTodos, takeToDo];
      setTodos(newTodo);
    }

  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Todo list</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        favTodo={favTodo}
      />
    </>
  );
}

export default TodoList;

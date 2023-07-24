import { useContext, useState } from 'react';
import { TodoList } from '../TodoList';
import { TodosContext, TodosUpdateContext } from '../../context/TodosContext';
import { Footer } from '../Footer';

export const TodoApp: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const todos = useContext(TodosContext);
  const { addTodo } = useContext(TodosUpdateContext);

  // const handleClick = (currentTodos: Todo[]) => {
  //   if (currentTodos.every(todo => todo.completed)
  //   || currentTodos.every(todo => !todo.completed)) {
  //     setTodos(currentTodos.map(todo => ({
  //       ...todo,
  //       completed: !todo.completed,
  //     })));
  //   } else {
  //     setTodos(currentTodos.map(todo => ({
  //       ...todo,
  //       completed: true,
  //     })));
  //   }

  //   setTodos(currentTodos.map(todo => {
  //     if (!todo.completed) {
  //       const updatedTodo = {
  //         id: todo.id,
  //         title: todo.title,
  //         completed: !todo.completed,
  //       };

  //       return updatedTodo;
  //     }

  //     return todo;
  //   }));
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = event.target.value.trim();

    setInputValue(normalizedValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      addTodo({
        id: +new Date(),
        title: inputValue,
        completed: false,
      });
      setInputValue('');
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          // onClick={handleClick}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={todos} />
      </section>

      {!!todos.length && <Footer items={todos} />}

    </div>
  );
};

import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../types/todos';

export const TodosContext = React.createContext([] as Todo[]);

type TodosUpdateContextTypes = {
  addTodo: (todo: Todo) => void,
  updateTodo: () => void,
  deleteTodo: (id: number) => void,
  updateTodoStatus: (updatedTodo: Todo, checkedTodo: Todo) => void,
};

export const TodosUpdateContext = React.createContext<TodosUpdateContextTypes>({
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  updateTodoStatus: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }, []);

  const updateTodo = () => {};

  const deleteTodo = useCallback((id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => (
      todo.id !== id
    )));
  }, []);

  const updateTodoStatus = useCallback((
    updatedTodo: Todo,
    checkedTodo: Todo,
  ) => {
    setTodos(currentTodos => currentTodos.map(todo => (
      todo.id === checkedTodo.id
        ? updatedTodo
        : todo
    )));
  }, []);

  const value = useMemo(() => ({
    addTodo,
    updateTodo,
    deleteTodo,
    updateTodoStatus,
  }), [todos]);

  return (
    <TodosUpdateContext.Provider value={value}>
      <TodosContext.Provider value={todos}>
        {children}
      </TodosContext.Provider>
    </TodosUpdateContext.Provider>
  );
};

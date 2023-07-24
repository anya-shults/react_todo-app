/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import React, { useContext } from 'react';
import { Todo } from '../../types/todos';
import { TodosUpdateContext } from '../../context/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { deleteTodo, updateTodoStatus } = useContext(TodosUpdateContext);

  const handleCheckboxClick = (currentTodo: Todo) => {
    const updatedTodo = {
      id: currentTodo.id,
      title: currentTodo.title,
      completed: !currentTodo.completed,
    };

    updateTodoStatus(updatedTodo, currentTodo);
  };

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className={cn('toggle', {
            completed: todo.completed,
          })}
          id={todo.completed
            ? 'toggle-completed'
            : 'toggle-view'}
          checked={todo.completed}
          onClick={() => handleCheckboxClick(todo)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
});

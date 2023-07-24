import { Todo } from '../../types/todos';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[],
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(item => (
        <TodoItem todo={item} />
      ))}
    </ul>
  );
};

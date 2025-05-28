import { useRecoilState } from 'recoil';
import { todoListState } from '../state/todoState';
import TodoForm from '../components/TodoForm';
import { Check, Trash2 } from 'lucide-react';

export default function TodoList() {
  const [todos, setTodos] = useRecoilState(todoListState);

  const completeTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: true } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <TodoForm />
      <div className="mt-6 space-y-4">
        {todos.map(todo => (
          <div key={todo.id} className="border p-4 rounded shadow flex justify-between items-start">
            <div>
              <h3 className="font-bold">{todo.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: todo.description }} />
            </div>
            <div className="flex gap-2">
              {!todo.completed && (
                <button onClick={() => completeTodo(todo.id)}>
                  <Check className="text-green-500" />
                </button>
              )}
              <button onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      {/* <Route path="/completed" element={<CompletedTodos />} /> */}
    </Routes>
  );
}

export default App;

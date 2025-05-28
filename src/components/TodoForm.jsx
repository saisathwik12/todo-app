import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';
import { todoListState } from '../state/todoState';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
});

export default function TodoForm() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const editor = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newTodo = {
        id: Date.now(),
        ...values,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      toast.success('Todo added!');
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 space-y-4">
      <input
        name="title"
        placeholder="Title"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="p-2 border w-full"
      />
      {formik.errors.title && <p className="text-red-500">{formik.errors.title}</p>}

      <JoditEditor
        ref={editor}
        value={formik.values.description}
        onChange={(newContent) => formik.setFieldValue('description', newContent)}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Todo
      </button>
    </form>
  );
}

import React, { useState } from 'react';
import { IoClipboardOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { VscSaveAs } from "react-icons/vsc";



const Todo = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: editInput } : todo)));
    setEditId(null);
    setEditInput('');
  };

  return (
    <div className="w-[280px] mt-2 mb-2 bg-white rounded p-2 shadow-md ml-20">
      <div className="flex flex-row items-center mb-4">
        <p className="text-lg flex items-center">
          To do List <span className="ml-2"><IoClipboardOutline /></span>
        </p>
      </div>
      <div className="flex flex-row items-center mb-4">
        <input
          placeholder="Add a task..."
          className="border-[2px] border-gray-400 rounded p-1 flex-grow mr-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="border-[2px] border-black pl-2 pr-2 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul className='h-[100px] overflow-y-scroll'>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            {editId === todo.id ? (
              <div className="flex-grow flex items-center">
                <input
                  className="border-[2px] border-gray-400 rounded p-1 flex-grow mr-2"
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button
                  className="border-[2px]  pl-2 pr-2 rounded"
                  onClick={() => saveEdit(todo.id)}
                >
                  <VscSaveAs/>
                </button>
              </div>
            ) : (
              <>
                <span className="flex-grow">{todo.text}</span>
                <button
                  className="ml-2 border-[2px] pl-2 pr-2 rounded"
                  onClick={() => startEditing(todo.id, todo.text)}
                >
                  <CiEdit/>
                </button>
                <button
                  className="ml-2 border-[2px] pl-2 pr-2 rounded"
                  onClick={() => removeTodo(todo.id)}
                >
                  <MdOutlineDeleteOutline/>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
import React, { useState, useRef, useEffect } from "react";
//import icons in reacticon
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import "./Todo.css";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editID, setEditID] = useState(0); //editing propose


  // direct dom manipulation
  const inputRef = useRef(null); //corrected the ref name

  // focucing  curser in text box
  useEffect(() => {
    inputRef.current.focus();
  });

  // prevent refreshing page on form submission
  const handleSumbit = (event) => {
    event.preventDefault();
  };

 //add todo
  const AddTodo = () => {
    if (todo !== "") {
      if (editID) {
        const updatetodo = todos.map((to) =>
          to.id === editID ? { ...to, list: todo } : to
        );
        setTodos(updatetodo);
        setEditID(0);
      } else {
        setTodos([...todos, { id: Date.now(), list: todo, status: false }]);
      }
      setTodo("");
    }
  };

  //TODO delete
  const onDelete = (id, value) => {
    setTodos(todos.filter((data) => data.id !== id));
   
  };

  //TODO complete
  const onComplete = (id) => {
    const completedTodos = todos.map((obj) =>
      obj.id === id ? { ...obj, status: !obj.status } : obj
    );
    setTodos(completedTodos);
  };

  //TODO edit
  const onEdit = (id) => {
    const editTodo = todos.find((obj) => obj.id === id);
    setEditID(editTodo.id);
    setTodo(editTodo.list);
  };

  return (
    <div className="container">
      <h2>TodoApp</h2>

      <form className="form-group" onSubmit={handleSumbit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter.... "
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />

        <button onClick={AddTodo}>{editID ? "Edit" : "Add"}</button>
      </form>

      <div className="list">
        <ul>
          {todos.map((obj) => (
            <li className="list-items" key={obj.id}>
              <div
                className="list-item-list"
                id={obj.status ? "list-item" : " "}
              >
                {obj.list}
              </div>

              <span>
                <IoCheckmarkDoneCircle
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(obj.id)}
                />

                <FaRegEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(obj.id)}
                />

                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(obj.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

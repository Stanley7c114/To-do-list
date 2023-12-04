import React, { Fragment, useState, useEffect } from "react";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  //delete todos
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //get all todos
  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);
  console.log(todos);
  return (
    <Fragment>
      {" "}
      <table className="table">
        <thead>
          <tr>
            <th>Tasks List</th>
            <td>Progress</td>
          </tr>
        </thead>
        {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>*/}
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <th>
                <button onClick={() => deleteTodo(todo.todo_id)}>Complete</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
export default ListTodo;

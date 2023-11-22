import React, { Fragment, useState, useEffect } from "react";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);
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
  console.log(todos)
  return (
    <Fragment>
      {" "}
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Done</th>
          </tr>
        </thead>
        {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>*/}
        <tbody>
            {todos.map(todo => (
                <tr>
                    <td>{todo.description}</td>
                    <td>Edit</td>
                    <td>delete</td>
                </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};
export default ListTodo;

import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="inputTodo">Daily To-do</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Add something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></input>
        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;

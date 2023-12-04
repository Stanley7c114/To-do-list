const express = require('express');
const app = express();
const path = require('path');
const pool = require("./db")
const cors = require("cors");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//Uncomment this when using port 3000 with production mode
// app.use('/dist',express.static(path.join(__dirname, '../dist')));
// app.get('*', (req, res,next) => {
  // res.sendFile(path.join(__dirname, '../dist','index.html'));
// });

// Routes
//create a task
 app.post("/todos", async(req,res) => {
  try {
    // console.log(req.body)
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *;"
    ,[description]);
    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
 })

 // get all task
 app.get("/todos", async(req,res) => {
  try {
    const allData = await pool.query("SELECT * FROM todo")
    res.json(allData.rows)
  } catch (err) {
    console.error(err.message)
  }
 })
//get a todo
app.get("/todos/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message)
    }
})
 //delete a todo
app.delete("/todos/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json("Todo was deleted")
  } catch (err) {
    console.error(err.message)
    }
})


// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  
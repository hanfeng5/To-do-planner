// import './App.css';
import React, { useState } from "react"
import "./index.css";
import Todo from "./components/Todo"
// import FilterButton from "./components/FilterButton";
import Form from "./components/Form"
import { nanoid } from "nanoid"



function App(props) {

  const [tasks, setTask] = useState(props.tasks);


  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed:false}
    setTask([...tasks, newTask]);
  }
console.log(tasks)

  const taskList = tasks.map((task) => (
  <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id} 
    toggleTaskComplete = {toggleTaskComplete}
    deleteTask = {deleteTask}
    editTask = {editTask}
    />
));


let remaining
// const task_noun = taskList.length !== 1 && taskList.length !==0? "tasks" : "task" //does it not equal to 1 or 0? if yes do tasks, otherwise do task
let task_number = countComplete();
// const task_remain = `${taskList.length} ${task_noun} remaining`
// let task_remain = `${taskList.length} ${task_noun} remaining`
const task_noun = task_number !== 1 && task_number !==0? "tasks" : "task" //does it not equal to 1 or 0? if yes do tasks, otherwise do task
let task_remain = `${task_number} ${task_noun} remaining`



// const allDone = taskList.length === 0? "Good job! All done!" : undefined
const allDone = task_number === 0? "Good job! All done!" : undefined



function toggleTaskComplete(id) {
  const updatedTasks = tasks.map ((task) => {
    if (id === task.id) {
      return {...task, completed : !task.completed}
    }
    // console.log(remaining)
    return task;
  })
  setTask(updatedTasks);
}

function countComplete () {
   remaining = 0;
   tasks.forEach(task => {
    if (!task.completed) {
      remaining += 1;
    }
   })
   return remaining;

}

function deleteTask (id) {
  const remaining_task = tasks.filter((task) => id !== task.id);
  setTask(remaining_task);
}

function editTask (id, newName) {
  const editedTask = tasks.map((task) => {
    if (task.id === id) {
      return {...task, name: newName}
    }
    return task;
  })
  setTask(editedTask);
}

return (
<div className="todoapp stack-large">
  <h1>To-Do-Planner!</h1>
  <Form addTask={addTask}></Form>
  {/* <div className="filters btn-group stack-exception">
    <FilterButton></FilterButton>
    <FilterButton></FilterButton>
    <FilterButton></FilterButton>
  </div> */}
  <h2 id="list-heading">{task_remain}</h2>
  <h2 id="list-heading">{allDone}</h2>
  <ul
    role="list"
    className="todo-list stack-large stack-exception"
    aria-labelledby="list-heading">
      {taskList}
  </ul>
</div>
)
}

export default App;

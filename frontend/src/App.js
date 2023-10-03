import { ToDoList } from "./todoList";
import "./App.css";
import { useState } from "react";

function App() {
  const [list, setlist] = useState([]);
  //todo get items from server and set it in list and use TodoList
  return (
    <>
      <ToDoList data={list}></ToDoList>
    </>
  );
}

export default App;


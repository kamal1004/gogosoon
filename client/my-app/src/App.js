import React from "react";
import './App.css';
import UpdateForm from "./components/update"
import CreateForm from "./components/create"
import ListForm from "./components/list"
import DeleteForm from "./components/delete"

function App() {
  return (
    <div className="App">
    <h1>Welcome to CRUD Operations</h1>
        <CreateForm />
        <ListForm />
        <UpdateForm />
        <DeleteForm />
    </div>
  );
}

export default App;

import Alert from "./Alert";
import { useState, useEffect } from "react";
import List from "./List";
const getLocalStorage = () => {
  let list = localStorage.getItem("Todos");
  if (list) {
    return JSON.parse(localStorage.getItem("Todos"));
  } else {
    return [];
  }
};
const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handelSumbit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEdit) {
      setList(
        list.map((todo) => {
          if (todo.id == editID) {
            return { ...todo, title: name };
          }
          return todo;
        })
      );
      setName("");
      setEditID(null);
      setIsEdit(false);
      showAlert(true, "success", "Todo edited");
    } else {
      showAlert(true, "success", "Item added to the list");
      const newTodo = { id: new Date().getTime().toString(), title: name };
      setList([...list, newTodo]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "The list is Empty");
    setList([]);
  };

  const removeTodo = (id) => {
    showAlert(true, "danger", "Todo is removed");
    setList(list.filter((todo) => todo.id !== id));
  };
  const editTodo = (id) => {
    const EditedTodo = list.find((todo) => todo.id === id);
    setIsEdit(true);
    setEditID(id);
    setName(EditedTodo.title);
  };
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(list));
  }, [list]);
  return (
    <div className="cont m-auto">
      <div className="container">
        <h1 className="m-5 text-center">ToDo List</h1>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <form onSubmit={handelSumbit}>
          <div className="form-group d-flex ">
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button className="btn-submit">{isEdit ? "Edit" : "sumbit"}</button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="list-container">
            <List list={list} removeTodo={removeTodo} editTodo={editTodo} />
            <button onClick={clearList} className="btn-clear">
              clear List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

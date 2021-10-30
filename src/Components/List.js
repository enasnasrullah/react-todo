import React from "react";

const List = ({ list, removeTodo, editTodo }) => {
  console.log(list);
  return (
    <div>
      {list.map((todo, index) => {
        return (
          <div className="container-todos d-flex " key={index}>
            <p>{todo.title}</p>
            <div className="btn-container">
              <button
                className="btn btn-success m-2"
                onClick={() => {
                  editTodo(todo.id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  removeTodo(todo.id);
                }}
                className="btn btn-danger m-2"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default List;

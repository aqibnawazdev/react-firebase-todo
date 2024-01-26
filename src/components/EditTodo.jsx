import React, { useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase.config";

const EditTodo = ({ task, id, fetch }) => {
  const [todo, setTodo] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const todoDocument = doc(db, "todo", id);
    try {
      await updateDoc(todoDocument, {
        todo: todo,
      });
      fetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${id}`}
      >
        Edit Todo
      </button>

      <div
        className="modal fade"
        id={`id${id}`}
        tabIndex="-1"
        aria-labelledby="editLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editLabel">
                Update Todo Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="d-flex" onSubmit={handleUpdate}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={task}
                  onChange={(e) => setTodo(e.target.value)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-md-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary btn-md-sm"
                onClick={(e) => handleUpdate(e)}
              >
                Update Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;

import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../services/firebase.config";

const Todo = () => {
  const [createTodo, setCreateTodo] = useState("");
  const [todos, setToDos] = useState([]);
  const collectionRef = collection(db, "todo");

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setToDos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setToDos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [todos]);

  const sumbitTodo = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      fetchData();
    } catch (error) {
      console.log(error);
    }

    setCreateTodo("");
  };

  const handleDelete = async (id) => {
    const documentRef = doc(db, "todo", id);
    const item = await deleteDoc(documentRef);
    fetchData();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                  type="button"
                  className="btn btn-info"
                >
                  Add Todo
                </button>

                <div className="todo-list">
                  <hr />
                  {todos.map((task) => (
                    <div className="todo-item" key={task.id}>
                      <div className="task-details">
                        <div className="taskbox">
                          <input type="checkbox" className="chackbox" />
                          <h3 className="task">&nbsp; {task.todo}</h3>
                        </div>
                        <div className="date">10/11/2022</div>
                      </div>
                      <div className="buttons">
                        <span className="mx-3">
                          <EditTodo task={task.todo} id={task.id} />
                        </span>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(task.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="d-flex" onSubmit={sumbitTodo}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  Add Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a Todo"
                  value={createTodo}
                  onChange={(e) => setCreateTodo(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>

                <button className="btn btn-primary" data-bs-dismiss="modal">
                  Create Todo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Todo;

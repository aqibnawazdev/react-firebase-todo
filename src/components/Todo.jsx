import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  startAt,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../services/firebase.config";

const Todo = () => {
  const [createTodo, setCreateTodo] = useState("");
  const [todos, setToDos] = useState([]);
  const [loadFlag, setLoadFlag] = useState(true);

  const collectionRef = collection(db, "todo");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadFlag(true);
    const first = query(collectionRef, orderBy("todo"), limit(5));
    try {
      const unsubscribe = onSnapshot(first, (doc) => {
        const data = doc.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        }));
        setToDos(data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const sumbitTodo = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        timeStamp: serverTimestamp(),
      });
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

  const handleCheck = async (id, status) => {
    const checkTask = doc(db, "todo", id);
    try {
      await updateDoc(checkTask, {
        isChecked: !status,
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeLoad = (data) => {
    const lastItem = data[data.length - 1].todo;
    console.log(lastItem);

    const next = query(
      collectionRef,
      orderBy("todo"),
      startAfter(lastItem),
      limit(5)
    );

    try {
      onSnapshot(next, (snapshot) => {
        if (snapshot.empty) {
          setLoadFlag(false);
          return;
        }
        const data = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        }));

        setToDos((prev) => {
          return [...prev, ...data];
        });
      });
    } catch (error) {
      console.log(error);
    }
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
                          <input
                            type="checkbox"
                            id={"checkbox" + task.id}
                            className="chackbox"
                            checked={task.isChecked}
                            onChange={() =>
                              handleCheck(task.id, task.isChecked)
                            }
                          />
                          <h3
                            aria-label={"checkbox" + task.id}
                            className={task.isChecked ? "task checked" : "task"}
                          >
                            &nbsp; {task.todo}
                          </h3>
                        </div>
                        <div className="date"></div>
                      </div>
                      <div className="buttons">
                        <span className="mx-3">
                          <EditTodo
                            task={task.todo}
                            id={task.id}
                            fetch={fetchData}
                          />
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

                <div className="py-4 mt-5">
                  <button
                    className="btn btn-success"
                    disabled={loadFlag ? false : true}
                    onClick={() => hanldeLoad(todos)}
                  >
                    {loadFlag ? "Load more..." : "No more data found..."}
                  </button>
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

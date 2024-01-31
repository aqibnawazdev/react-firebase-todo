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
  where,
} from "firebase/firestore";
import { db } from "../services/firebase.config";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const defaultTheme = createTheme();

const Todo = () => {
  const [createTodo, setCreateTodo] = useState("");
  const [todos, setToDos] = useState([]);
  const [loadFlag, setLoadFlag] = useState(true);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const collectionRef = collection(db, "todo");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        // ...
        console.log(user);
        setUser(user);
        fetchData(userId);
      } else {
        // User is signed out
        setUser(false);
      }
    });
  }, []);

  const fetchData = async (userId) => {
    setLoadFlag(true);
    console.log("User Id", userId);
    const first = query(
      collectionRef,
      where("userId", "==", userId),
      orderBy("todo"),
      limit(5)
    );

    try {
      const unsubscribe = onSnapshot(first, (doc) => {
        const data = doc.docs.map((d) => ({
          ...d.data(),
          todoId: d.id,
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
        userId: user.uid,
      });
      fetchData(user.uid);
    } catch (error) {
      console.log(error);
    }

    setCreateTodo("");
  };

  const handleDelete = async (id) => {
    const documentRef = doc(db, "todo", id);
    const item = await deleteDoc(documentRef);
    fetchData(user.uid);
  };

  const handleCheck = async (id, status) => {
    const checkTask = doc(db, "todo", id);
    try {
      await updateDoc(checkTask, {
        isChecked: !status,
      });
      fetchData(user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeLoadMore = (todos) => {
    const lastItem = todos[todos.length - 1].todo;
    console.log(lastItem);

    const next = query(
      collectionRef,
      orderBy("todo"),
      startAfter(lastItem),
      where("userId", "==", user.uid),
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
          createdAt: d.serverTimestamp,
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
    <Grid container alignItems="center" flex justifyContent="center">
      {user ? (
        <>
          <Grid
            item
            xs={10}
            md={7}
            sx={{ marginTop: "100px" }}
            // direction="column"
            alignItems="center"
          >
            <Box
              component="form"
              alignContent="center"
              onSubmit={sumbitTodo}
              sx={{ mt: 1 }}
            >
              <TextField
                fullWidth
                margin="normal"
                size="small"
                required
                name="todo"
                label="Todo"
                type="todo"
                id="todo"
                value={createTodo}
                onChange={(e) => setCreateTodo(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mb: 2 }}
              >
                Add task
              </Button>
            </Box>
          </Grid>
          <Grid item xs={10} md={7}>
            <div className="todo-list">
              {todos.map((task) => (
                <Paper elevation={1} className="todo-item" key={task.todoId}>
                  <div className="task-details">
                    <div className="taskbox">
                      <input
                        type="checkbox"
                        id={"checkbox" + task.id}
                        className="chackbox"
                        checked={task.isChecked}
                        onChange={() =>
                          handleCheck(task.todoId, task.isChecked)
                        }
                      />
                      <Typography
                        aria-label={"checkbox" + task.todoId}
                        className={task.isChecked ? "task checked" : "task"}
                        component="h4"
                      >
                        &nbsp; {task.todo}
                      </Typography>
                    </div>
                    <div className="date"></div>
                  </div>
                  <div className="buttons">
                    <span className="mx-3">
                      <EditTodo
                        task={task.todo}
                        id={task.todoId}
                        fetch={fetchData}
                      />
                    </span>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDelete(task.todoId);
                      }}
                    >
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </div>
                </Paper>
              ))}
            </div>

            <div className="py-4 mt-2">
              <Button
                color="secondary"
                variant="contained"
                className="btn btn-success"
                disabled={loadFlag ? false : true}
                onClick={() => hanldeLoadMore(todos)}
              >
                {loadFlag ? "Load more..." : "No more data found..."}
              </Button>
            </div>
          </Grid>
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
                    <button
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
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
      ) : (
        navigate("/login")
      )}
    </Grid>
  );
};
export default Todo;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: 16,
  fontWeight: "bold",
  cursor: "pointer",
  width: "500px",
}));

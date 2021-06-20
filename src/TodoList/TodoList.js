import React, { useContext } from "react";
import { TodoListContext } from "../context/Context";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginRight: 25,
    display: "flex",
    alignItems: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    "& > *": {
      margin: 1,
    },
  },

  paper: {
    fontSize: "20px",
  },

  deleteAndEditButtons: {
    marginLeft: 20,
  },

  deleteBtn: {
    marginBottom: "5px",
  },

  card: {
    fontSize: "1.5em",
    color: "blue",
  },

  todos: {
    textAlign: "center",
    width: 500,
  },
  todoAndButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function TodoList() {
  const { todoArray, deleteTodoById } = useContext(TodoListContext);
  const classes = useStyles();

  return (
    <form action=' submit'>
      {todoArray.map((item) => {
        return (
          <div className={classes.todoAndButton}>
            <div className={classes.card}>
              <Card>
                <CardContent className={classes.todos}>{item.todo}</CardContent>
              </Card>
            </div>

            <div className={classes.deleteAndEditButtons}>
              <div className={classes.deleteBtn}>
                <Button
                  onClick={() => deleteTodoById(item.id)}
                  variant='contained'
                  color='primary'
                  size='small'
                >
                  Delete Item
                </Button>
              </div>
              <div>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='small'
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </form>
  );
}

export default TodoList;

import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoInput from "../Input/TodoInput";
import TodoList from "../List/TodoList";
import { TodoInputContext, TodoListContext } from "../context/Context";
import { UserAuthorizationContext } from "../context/AuthenticateUser";
import useAuthenticateUser from "../Hooks/useAuthenticateUser";

function Home(props) {
  const [checkToken] = useAuthenticateUser();

  const initialTodos = window.localStorage.getItem("todos")
    ? JSON.parse(window.localStorage.getItem("todos"))
    : [];

  const [todoArray, setTodoArray] = useState(initialTodos);

  const addTodo = (todo) => {
    let updatedTodoArray = [
      ...todoArray,
      {
        id: uuidv4(),
        todo,
      },
    ];
    setTodoArray(updatedTodoArray);
  };

  const deleteTodoById = (id) => {
    let newArray = todoArray.filter((todo) => id !== todo.id);
    setTodoArray(newArray);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const authContext = useContext(UserAuthorizationContext);
  console.log(authContext);

  let token = checkToken();

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todoArray));
    if (!token) {
      props.history.push("/sign-in");
    }
  }, [todoArray, props.history, token]);

  return (
    <div className='mainApp' onSubmit={handleOnSubmit}>
      <div className='App'>
        <div className='todo-input-context'>
          <TodoInputContext.Provider value={{ todoArray, addTodo }}>
            <TodoInput />
          </TodoInputContext.Provider>
        </div>
        <div className='todo-list-context'>
          <TodoListContext.Provider value={{ todoArray, deleteTodoById }}>
            <TodoList />
          </TodoListContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default Home;

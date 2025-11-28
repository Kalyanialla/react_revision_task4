
import React, {useReducer,useRef,useEffect,useCallback,useMemo} from "react";








export function Todolist() {
  const initialState = [];
  const todoReducer=(state,action)=>{
     switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }

  }
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = useCallback(() => {
    const text = inputRef.current.value.trim();
    if (!text) return;

    dispatch({ type: "ADD", payload: text });
    inputRef.current.value = "";
    inputRef.current.focus();
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: "TOGGLE", payload: id });
  }, []);

  const removeTodo = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  const pendingTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
      Taks 5
      </h2>

      <div style={{ display: "flex", marginBottom: "15px" }}>
        <input
          ref={inputRef}
          placeholder="Enter todo..."
         
        />
        <button
          onClick={addTodo}
          style={{
            padding: "8px 15px",
            marginLeft: "8px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <h3>All Todos</h3>

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "black",
              fontStyle: todo.completed ? "italic" : "normal",
              opacity: todo.completed ? 0.6 : 1,
              flex: 1,
              fontSize: "16px",
              transition: "all 0.3s",
            }}
          >
            {todo.title}
          </span>

          <button
            onClick={() => toggleTodo(todo.id)}
            style={{
              padding: "5px 10px",
              marginRight: "5px",
              background: todo.completed ? "#4caf50" : "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {todo.completed ? "Pending" : "Done"}
          </button>

          <button
            onClick={() => removeTodo(todo.id)}
            style={{
              padding: "5px 10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <hr />

      <h3>Completed Todos</h3>
      {completedTodos.length === 0 && <p>No completed todos.</p>}
      {completedTodos.map((todo) => (
        <p key={todo.id} style={{ color: "gray", fontStyle: "italic" }}>
          {todo.title}
        </p>
      ))}

      <h3>Pending Todos</h3>
      {pendingTodos.length === 0 && <p>No pending todos.</p>}
      {pendingTodos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

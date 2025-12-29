

import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import './Todolist.css'

export const Todolist = () => {

  const initialValue = []

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: Date.now(),
            title: action.payload,
            completed: false
          }
        ]

      case "done":
        return state.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )

      case "del":
        return state.filter(todo => todo.id !== action.payload)

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducerFunction, initialValue)

  // useRef
  const myref = useRef()

  useEffect(() => {
    myref.current.focus()
  }, [])

  // useCallback
  const handleAdd = useCallback(() => {
    dispatch({ type: "add", payload: myref.current.value })
    myref.current.value = ""
  }, [])

  const handleDone = useCallback((id) => {
    dispatch({ type: "done", payload: id })
  }, [])

  const handleDelete = useCallback((id) => {
    dispatch({ type: "del", payload: id })
  }, [])

  // useMemo
  const completedTask = useMemo(() => {
    return state.filter((todo)=>todo.completed)
  }, [state])

  const pendingTask = useMemo(() => {
    return state.filter((todo)=> !todo.completed)
  }, [state])
return (
  <div className="todo-container">
    <h1 className="title">Todo List</h1>

    <div className="input-box">
      <input ref={myref} placeholder="Enter task" />
      <button onClick={handleAdd}>Add</button>
    </div>

    <h2>All Tasks</h2>
    {state.map(item => (
      <div className="task" key={item.id}>
        <span className={item.completed ? "done" : ""}>
          {item.title}
        </span>
        <div>
          <button onClick={() => handleDone(item.id)}>Done</button>
          <button className="delete" onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </div>
      </div>
    ))}

    <h2>Completed Tasks</h2>
    {completedTask.map(c => (
      <p key={c.id} className="completed-task">{c.title}</p>
    ))}

    <h2>Pending Tasks</h2>
    {pendingTask.map(p => (
      <p key={p.id} className="pending-task">{p.title}</p>
    ))}
  </div>
)

}

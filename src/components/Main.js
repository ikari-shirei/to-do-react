import '../styles/main.scss'
import Button from './Button'
import React, { useState } from 'react'
import uniqid from 'uniqid'

function Main({
  lists,
  setLists,
  updateSelectedList,
  selectedList,
  removeTask,
  toDoNext,
  doingNext,
  doingBack,
  doneBack,
}) {
  const [newTaskName, setNewTaskName] = useState('')

  const handleInput = (val) => {
    setNewTaskName(val.target.value)
  }

  const addNewTask = () => {
    if (newTaskName !== '') {
      const newTask = { id: uniqid(), name: newTaskName }

      let targetList = lists.find((list) => {
        return list === selectedList
      })

      const newToDo = [...targetList.todo, newTask]
      targetList.todo = newToDo

      const updatedLists = lists.map((list) => {
        return list === selectedList ? targetList : list
      })
      console.log(updatedLists)
      setLists(updatedLists)

      updateSelectedList(
        updatedLists.find((list) => {
          return list.id === selectedList.id
        })
      )

      setNewTaskName('')
    } else {
      alert('Enter a value')
    }
  }

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      addNewTask()
    }
  }

  return (
    <>
      <div className="to-do-container container">
        <div className="button-container">
          <h1>To Do</h1>
          <input
            onKeyPress={handleInputKeyPress}
            onChange={handleInput}
            value={newTaskName}
          />
          <button onClick={addNewTask}>Add Task</button>
        </div>
        <div className="inside-container">
          {selectedList.todo.map((todo) => {
            return (
              <div className="todo-button-container" key={todo.id}>
                <p>{todo.name}</p>
                <div>
                  <Button
                    id={todo.id}
                    handleButton={toDoNext}
                    type="next-button"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="doing-container container">
        <h1>Doing</h1>
        <div className="inside-container">
          {selectedList.doing.map((doing) => {
            return (
              <div className="todo-button-container" key={doing.id}>
                <p>{doing.name}</p>
                <div>
                  <Button
                    id={doing.id}
                    handleButton={doingBack}
                    type="back-button"
                  />
                  <Button
                    id={doing.id}
                    handleButton={doingNext}
                    type="next-button"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="done-container container">
        <h1>Done</h1>
        <div className="inside-container">
          {selectedList.done.map((done) => {
            return (
              <div className="todo-button-container" key={done.id}>
                <p>{done.name}</p>
                <div>
                  <Button
                    id={done.id}
                    handleButton={doneBack}
                    type="back-button"
                  />
                  <Button
                    id={done.id}
                    type="delete-button"
                    handleButton={removeTask}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Main

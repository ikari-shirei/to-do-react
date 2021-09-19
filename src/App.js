import React, { useState, useEffect } from 'react'
import Header from './components/Header'

function App() {
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'First List',
      todo: [
        { id: 1, name: 'First todo' },
        { id: 2, name: 'First todo' },
      ],
      doing: [
        { id: 1, name: 'First doing' },
        { id: 2, name: 'Second doing' },
      ],
      done: [
        { id: 1, name: 'First done' },
        { id: 2, name: 'Second done' },
      ],
    },
    {
      id: 2,
      name: 'Second List',
      todo: [
        { id: 1, name: 'First todo' },
        { id: 2, name: 'Second todo' },
        { id: 3, name: 'Second todo' },
        { id: 4, name: 'Second todo' },
        { id: 5, name: 'Second todo' },
      ],
      doing: [
        { id: 1, name: 'First doing' },
        { id: 2, name: 'Second doing' },
      ],
      done: [
        { id: 1, name: 'First done' },
        { id: 2, name: 'Second done' },
      ],
    },
  ])

  const [selectedList, setSelectedList] = useState({
    id: 2,
    name: 'Second List',
    todo: [
      { id: 1, name: 'First todo' },
      { id: 2, name: 'Second todo' },
      { id: 3, name: 'Second todo' },
      { id: 4, name: 'Second todo' },
      { id: 5, name: 'Second todo' },
    ],
    doing: [
      { id: 1, name: 'First doing' },
      { id: 2, name: 'Second doing' },
    ],
    done: [
      { id: 1, name: 'First done' },
      { id: 2, name: 'Second done' },
    ],
  })

  const addNewTask = (selected) => {
    /*  if (selected) {
      const newTask = { id: 11, name: 'TODO' }
      let targetList = lists.find((list) => {
        return list === selected
      })

      if (targetList) {
        const newToDo = [...targetList.todo, newTask]
        targetList.todo = newToDo

        const updatedLists = lists.map((list) => {
          return list === selected ? targetList : list
        })

        setSelectedList(targetList)
        console.log(updatedLists)
      } else {
        console.log('error')
      }
    } */
  }

  useEffect(addNewTask, [])

  const addNewList = (name) => {
    const newList = {
      id: 3,
      name: `${name}`,
      todo: [],
      doing: [],
      done: [],
    }

    setLists([...lists, newList])
  }

  const updateSelectedList = (listId) => {
    const targetList = lists.find((list) => {
      return list.id === listId
    })

    if (targetList) {
      setSelectedList(targetList)
    }

    console.log(selectedList)
  }

  useEffect(updateSelectedList, [])

  return (
    <div className="app">
      <div>
        <Header list={selectedList.name} />
      </div>
      <div className="main-content">
        <div className="to-do-container container">
          <div className="button-container">
            <h1>To Do</h1>
            <button onClick={() => addNewTask(selectedList)}>Add Task</button>
          </div>
          <div className="inside-container">
            {selectedList.todo.map((todo) => {
              return <p key={todo.id}>{todo.name}</p>
            })}
          </div>
        </div>
        <div className="doing-container container">
          <h1>Doing</h1>
          <div className="inside-container">
            {selectedList.doing.map((doing) => {
              return <p key={doing.id}>{doing.name}</p>
            })}
          </div>
        </div>
        <div className="done-container container">
          <h1>Done</h1>
          <div className="inside-container">
            {selectedList.done.map((done) => {
              return <p key={done.id}>{done.name}</p>
            })}
          </div>
        </div>
      </div>
      <div className="lists-container container">
        <div className="button-container">
          <h1>Lists</h1>
          <button onClick={() => addNewList('Heyheyhey')}>Add List</button>
        </div>
        <div className="inside-container">
          {lists.map((list) => {
            return (
              <button key={list.id} onClick={() => updateSelectedList(list.id)}>
                {list.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import uniqid from 'uniqid'
import Main from './components/Main'
import Lists from './components/Lists'

function App() {
  const [lists, setLists] = useState([
    {
      id: uniqid(),
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
      id: uniqid(),
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

  const [selectedList, setSelectedList] = useState(lists[0])

  const addNewTask = (selected) => {
    if (selected) {
      const newTask = { id: uniqid(), name: 'TODO' }

      let targetList = lists.find((list) => {
        return list === selected
      })

      if (targetList) {
        const newToDo = [...targetList.todo, newTask]
        targetList.todo = newToDo

        const updatedLists = lists.map((list) => {
          return list === selected ? targetList : list
        })
        console.log(updatedLists)
        setLists(updatedLists)

        updateSelectedList(
          updatedLists.find((list) => {
            return list.id === selected.id
          })
        )
      } else {
        console.log('error')
      }
    }
  }

  const updateSelectedList = (listId) => {
    const targetList = lists.find((list) => {
      return list.id === listId
    })

    if (targetList) {
      setSelectedList(targetList)
    }
  }

  useEffect(updateSelectedList, [])

  return (
    <div className="app">
      <div>
        <Header list={selectedList.name} />
      </div>
      <div className="main-content">
        <Main addNewTask={addNewTask} selectedList={selectedList} />
      </div>
      <div className="container">
        <Lists
          updateSelectedList={updateSelectedList}
          lists={lists}
          setLists={setLists}
          setSelectedList={setSelectedList}
        />
      </div>
    </div>
  )
}

export default App

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
        { id: uniqid(), name: 'First todo' },
        { id: uniqid(), name: 'Second todo' },
      ],
      doing: [
        { id: uniqid(), name: 'First doing' },
        { id: uniqid(), name: 'Second doing' },
      ],
      done: [
        { id: uniqid(), name: 'First done' },
        { id: uniqid(), name: 'Second done' },
      ],
    },
    /*  {
      id: uniqid(),
      name: 'Second List',
      todo: [
        { id: uniqid(), name: 'First todo' },
        { id: uniqid(), name: 'Second todo' },
        { id: uniqid(), name: 'Second todo' },
        { id: uniqid(), name: 'Second todo' },
        { id: uniqid(), name: 'Second todo' },
      ],
      doing: [
        { id: uniqid(), name: 'First doing' },
        { id: uniqid(), name: 'Second doing' },
      ],
      done: [
        { id: uniqid(), name: 'First done' },
        { id: uniqid(), name: 'Second done' },
      ],
    }, */
  ])

  const [selectedList, setSelectedList] = useState(lists[0])

  const updateSelectedList = (listId) => {
    const targetList = lists.find((list) => {
      return list.id === listId
    })

    if (targetList) {
      setSelectedList(targetList)
    }
  }

  useEffect(updateSelectedList, [])

  const removeTask = (val) => {
    if (window.confirm('Are you sure?')) {
      const targetList = lists.find((list) => {
        return selectedList.id === list.id
      })
      const targetDone = targetList.done.find((done) => {
        return val.target.id === done.id
      })
      const newDone = targetList.done.filter((done) => {
        return done !== targetDone
      })
      targetList.done = newDone
      const newLists = lists.map((list) => {
        return list.id === targetList.id ? targetList : list
      })

      setLists(newLists)
    }
  }

  const toDoNext = (val) => {
    const targetId = val.target.id
    const targetList = lists.find((list) => {
      return selectedList.id === list.id
    })
    const targetToDo = targetList.todo.find((todo) => {
      return targetId === todo.id
    })
    const targetToDoIndex = targetList.todo.findIndex((i) => i.id === targetId)
    targetList.doing.push(targetToDo)
    targetList.todo.splice(targetToDoIndex, 1)
    const newLists = lists.map((list) => {
      return list.id === targetList.id ? targetList : list
    })
    setLists(newLists)
  }

  const doingNext = (val) => {
    const targetId = val.target.id
    const targetList = lists.find((list) => {
      return selectedList.id === list.id
    })
    const targetDoing = targetList.doing.find((doing) => {
      return targetId === doing.id
    })
    const targetDoingIndex = targetList.doing.findIndex(
      (i) => i.id === targetId
    )
    targetList.done.push(targetDoing)
    targetList.doing.splice(targetDoingIndex, 1)
    const newLists = lists.map((list) => {
      return list.id === targetList.id ? targetList : list
    })
    setLists(newLists)
  }

  const doingBack = (val) => {
    const targetId = val.target.id
    const targetList = lists.find((list) => {
      return selectedList.id === list.id
    })
    const targetDoing = targetList.doing.find((doing) => {
      return targetId === doing.id
    })
    const targetDoingIndex = targetList.doing.findIndex(
      (i) => i.id === targetId
    )
    targetList.todo.push(targetDoing)
    targetList.doing.splice(targetDoingIndex, 1)
    const newLists = lists.map((list) => {
      return list.id === targetList.id ? targetList : list
    })
    setLists(newLists)
  }

  const doneBack = (val) => {
    const targetId = val.target.id
    const targetList = lists.find((list) => {
      return selectedList.id === list.id
    })
    const targetDone = targetList.done.find((done) => {
      return targetId === done.id
    })
    const targetDoneIndex = targetList.done.findIndex((i) => i.id === targetId)
    targetList.doing.push(targetDone)
    targetList.done.splice(targetDoneIndex, 1)
    const newLists = lists.map((list) => {
      return list.id === targetList.id ? targetList : list
    })
    setLists(newLists)
  }

  return (
    <div className="app">
      <div>
        <Header list={selectedList.name} />
      </div>
      <div className="main-content">
        <Main
          lists={lists}
          setLists={setLists}
          updateSelectedList={updateSelectedList}
          selectedList={selectedList}
          removeTask={removeTask}
          toDoNext={toDoNext}
          doingNext={doingNext}
          doingBack={doingBack}
          doneBack={doneBack}
        />
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

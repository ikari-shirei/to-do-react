import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import uniqid from 'uniqid'
import Main from './components/Main'
import Lists from './components/Lists'

function App() {
  const defaultList = [
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
  ]

  if (!localStorage.getItem('list')) {
    const defaultListJSON = JSON.stringify(defaultList)
    localStorage.setItem('list', defaultListJSON)
  }

  const storageList = JSON.parse(localStorage.getItem('list'))

  const [lists, setLists] = useState(storageList || defaultList)

  const [selectedList, setSelectedList] = useState(lists[0])

  const saveToStorage = (lists) => {
    const listJSON = JSON.stringify(lists)

    localStorage.setItem('list', listJSON)
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
      saveToStorage(newLists)
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
    saveToStorage(newLists)
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
    saveToStorage(newLists)
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
    saveToStorage(newLists)
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
    saveToStorage(newLists)
  }

  return (
    <div className="app">
      <div>
        <Header list={selectedList.name} />
      </div>
      <div className="bottom-body">
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
        <div className="all-lists-container container">
          <Lists
            updateSelectedList={updateSelectedList}
            lists={lists}
            setLists={setLists}
            setSelectedList={setSelectedList}
          />
        </div>
      </div>
    </div>
  )
}

export default App

import '../styles/lists.scss'
import Button from './Button'
import uniqid from 'uniqid'
import React, { useState } from 'react'

function Lists({ updateSelectedList, lists, setLists, setSelectedList }) {
  const [newListName, setNewListName] = useState('')

  const handleButton = (selectedList) => {
    const targetId = selectedList.target.id
    if (lists.length === 1) {
      alert("You can't delete your last list.")
    } else {
      const updatedList = lists.filter((list) => {
        return list.id !== targetId
      })

      setLists(updatedList)
      setSelectedList(updatedList[0])
    }
  }

  const handleInput = (text) => {
    setNewListName(text.target.value)
  }

  const addNewList = () => {
    const newList = {
      id: uniqid(),
      name: newListName,
      todo: [],
      doing: [],
      done: [],
    }

    setLists([...lists, newList])
    setNewListName('')
  }

  return (
    <>
      <div className="button-container">
        <h1>Lists</h1>
        <input onChange={handleInput} value={newListName}></input>
        <button onClick={addNewList}>Add List</button>
      </div>
      <div className="lists-container">
        {lists.map((list) => {
          return (
            <div className="list-button-container" key={list.id}>
              <button
                className="list-item"
                onClick={() => updateSelectedList(list.id)}
              >
                {list.name}
              </button>
              <Button
                type="delete-button"
                id={list.id}
                handleButton={handleButton}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Lists

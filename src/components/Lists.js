import '../styles/lists.scss'
import Button from './Button'
import uniqid from 'uniqid'
import React, { useState } from 'react'

function Lists({ updateSelectedList, lists, setLists, setSelectedList }) {
  const [newListName, setNewListName] = useState('')

  const removeList = (selectedList) => {
    const targetId = selectedList.target.id
    if (lists.length === 1) {
      alert("You can't delete your last list.")
    } else if (window.confirm('Are you sure?')) {
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

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      addNewList()
    }
  }

  const addNewList = () => {
    if (newListName !== '') {
      const newList = {
        id: uniqid(),
        name: newListName,
        todo: [],
        doing: [],
        done: [],
      }

      setLists([...lists, newList])
      setNewListName('')
    } else {
      alert('Enter a value')
    }
  }

  return (
    <>
      <div className="button-container">
        <h1>Lists</h1>
        <input
          className="todo-input"
          onChange={handleInput}
          onKeyPress={handleInputKeyPress}
          value={newListName}
        ></input>
        <button className="todo-button" onClick={addNewList}>
          Add{' '}
        </button>
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
                handleButton={removeList}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Lists

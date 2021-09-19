import '../styles/lists.scss'
import Button from './Button'

function Lists({
  updateSelectedList,
  addNewList,
  lists,
  setLists,
  setSelectedList,
}) {
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

  return (
    <>
      <div className="button-container">
        <h1>Lists</h1>
        <button onClick={() => addNewList('Heyheyhey')}>Add List</button>
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

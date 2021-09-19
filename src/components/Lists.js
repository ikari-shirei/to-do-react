import '../styles/lists.scss'

function Lists({ updateSelectedList, addNewList, lists }) {
  return (
    <>
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
    </>
  )
}

export default Lists

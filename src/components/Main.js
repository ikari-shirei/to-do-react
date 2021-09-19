import '../styles/main.scss'

function Main({ addNewTask, selectedList }) {
  return (
    <>
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
    </>
  )
}

export default Main

import '../styles/main.scss'
import Button from './Button'

function Main({ addNewTask, selectedList, removeTask }) {
  return (
    <>
      <div className="to-do-container container">
        <div className="button-container">
          <h1>To Do</h1>
          <button onClick={() => addNewTask(selectedList)}>Add Task</button>
        </div>
        <div className="inside-container">
          {selectedList.todo.map((todo) => {
            return (
              <div className="todo-button-container" key={todo.id}>
                <p>{todo.name}</p>
                <div>
                  <Button type="next-button" />
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
                  <Button type="back-button" />
                  <Button type="next-button" />
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
                    type="delete-button"
                    handleButton={removeTask}
                  />
                  <Button type="back-button" />
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

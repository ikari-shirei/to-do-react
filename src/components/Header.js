import '../styles/header.scss'

function Header({ list }) {
  return (
    <div className="header">
      <h1>To Do App</h1>
      <h1>{list}</h1>
    </div>
  )
}

export default Header

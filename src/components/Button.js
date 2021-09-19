import '../styles/button.scss'

function Button({ type, id, handleButton }) {
  const buttonTitle = type === 'delete-button' ? 'Del' : 'Add'

  return (
    <div className={type}>
      <button id={id} onClick={handleButton}>
        {buttonTitle}
      </button>
    </div>
  )
}

export default Button

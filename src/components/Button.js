import '../styles/button.scss'

function Button({ type, id, handleButton }) {
  const buttonTitle =
    type === 'delete-button' ? 'Del' : type === 'next-button' ? 'Next' : 'Back'

  return (
    <div className={type}>
      <button id={id} onClick={handleButton}>
        {buttonTitle}
      </button>
    </div>
  )
}

export default Button

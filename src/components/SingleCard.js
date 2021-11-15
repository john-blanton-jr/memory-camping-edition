// assets
import Cover from '../assets/cover.png'

// styles
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front"/>
        <img src={Cover} onClick={handleClick} className="back" alt="card back" />
      </div>
    </div>
  )
}

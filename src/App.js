import { useEffect, useState } from 'react'

// components
import SingleCard from './components/SingleCard'

// assets
import One from './assets/one.jpeg'
import Two from './assets/two.jpeg'
import Three from './assets/three.jpeg'
import Four from './assets/four.jpeg'
import Five from './assets/five.jpeg'
import Six from './assets/six.jpeg'


// styles
import './App.css'

const cardImages = [
  { "src": One, matched: false },
  { "src": Two, matched: false },
  { "src": Three, matched: false },
  { "src": Four, matched: false },
  { "src": Five, matched: false },
  { "src": Six, matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000) 
      }
    }
  }, [choiceOne, choiceTwo])


  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory</h1>
      <h3>Camping Edition</h3>
      <button onClick={shuffleCards}>New Game</button>
        <p>Turns: {turns}</p>    

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App
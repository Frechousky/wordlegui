import { CharacterStatus } from '../../constants'
import CharacterBox from '../CharacterBox/CharacterBox'

import './GameGrid.css'
import { StatusPositionMap } from '../../persistence'

type GameGridProps = {
  maxAttempts: number
  wordLength: number
  words: string[]
  statuses: StatusPositionMap
}

function GameGrid ({ maxAttempts, wordLength, words, statuses }: GameGridProps) {
  if (words.length !== maxAttempts) {
    throw Error(
      `Invalid word count (expected: ${maxAttempts}, got: ${words.length})`
    )
  }
  if (words.some(v => v.length !== wordLength)) {
    throw Error('At least one word with invalid length')
  }
  const rows = []
  for (let i = 0; i < maxAttempts; i++) {
    const row = []
    for (let j = 0; j < wordLength; j++) {
      const character = words[i][j]
      let status = statuses[character] ? statuses[character][j] : undefined
      if (status === undefined) {
        status = CharacterStatus.UNKNOWN
      }
      row.push(
        <CharacterBox
          character={character}
          status={status}
          key={j * wordLength + i}
        />
      )
    }
    rows.push(
      <div className='game-grid-row-container' key={i}>
        {row}
      </div>
    )
  }
  return <div className='game-grid-container'>{rows}</div>
}

export default GameGrid

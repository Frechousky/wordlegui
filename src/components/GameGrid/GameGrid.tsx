import { CharacterStatus, LETTER_UNKNOWN } from '../../constants'
import LetterInput from '../LetterInput/LetterInput'

type GameGridProps = {
  words: string[]
  statuses: CharacterStatus[][]
  wordLength: number
  maxAttempts: number
}

function GameGrid ({ words, statuses, wordLength, maxAttempts }: GameGridProps) {
  const rows = []
  for (let i = 0; i < maxAttempts; i++) {
    const row = []
    for (let j = 0; j < wordLength; j++) {
      // fills grid with '_' letter and unknown status when words or statuses is missing
      const letter =
        words[i] !== undefined && words[i][j] !== undefined
          ? words[i][j]
          : LETTER_UNKNOWN
      const status =
        statuses[i] !== undefined && statuses[i][j] !== undefined
          ? statuses[i][j]
          : CharacterStatus.UNKNOWN
      row.push(
        <LetterInput
          character={letter}
          status={status}
          key={j * wordLength + i}
        />
      )
    }
    rows.push(<div key={i}>{row}</div>)
  }
  return <div>{rows}</div>
}

export default GameGrid

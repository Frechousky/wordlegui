import { LetterBoxType, LetterStatus } from '../../model'
import LetterBox from '../LetterBox/LetterBox'

import './Grid.css'

type GridProps = {
  maxAttempts: number
  wordLength: number
  words: LetterBoxType[][]
  statuses: LetterStatus[][]
}
function Grid ({ maxAttempts = 6, wordLength, words, statuses }: GridProps) {
  if (words.length !== maxAttempts) {
    throw Error('invalid word count')
  }
  if (words.some(v => v.length !== wordLength)) {
    throw Error('at least one word with invalid length')
  }
  if (statuses.length !== maxAttempts) {
    throw Error('invalid status count')
  }
  if (statuses.some(v => v.length !== wordLength)) {
    throw Error('at least one status with invalid length')
  }
  const rows = []
  for (let i = 0; i < maxAttempts; i++) {
    const row = []
    for (let j = 0; j < wordLength; j++) {
      row.push(
        <LetterBox
          value={words[i][j]}
          status={statuses[i][j]}
          key={j * wordLength + i}
        />
      )
    }
    rows.push(
      <div className='grid-row-container' key={i}>
        {row}
      </div>
    )
  }
  return <div className='grid-container'>{rows}</div>
}

export default Grid

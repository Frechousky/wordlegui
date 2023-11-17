import { CharacterStatus } from '../../constants'
import CharacterBox from '../CharacterBox/CharacterBox'

import { Box } from '@mui/material'

type GameGridProps = {
  words: string[]
  statuses: CharacterStatus[][]
}

function GameGrid ({ words, statuses }: GameGridProps) {
  const maxAttempts = words.length
  const wordLength = words[0].length
  if (words.some(v => v.length !== wordLength)) {
    throw Error('At least one word with invalid length')
  }
  if (statuses.some(v => v.length !== wordLength)) {
    throw Error('At least one status with invalid length')
  }
  const rows = []
  for (let i = 0; i < maxAttempts; i++) {
    const row = []
    for (let j = 0; j < wordLength; j++) {
      const character = words[i][j]
      const status =
        statuses.length > i ? statuses[i][j] : CharacterStatus.UNKNOWN
      row.push(
        <CharacterBox
          character={character}
          status={status}
          key={j * wordLength + i}
        />
      )
    }
    rows.push(<Box key={i}>{row}</Box>)
  }
  return <Box>{rows}</Box>
}

export default GameGrid

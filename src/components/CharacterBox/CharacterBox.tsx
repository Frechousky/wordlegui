import { CharacterStatus } from '../../constants'

import './CharacterBox.css'

type CharacterBoxProps = {
  character: string
  status: CharacterStatus
}

function CharacterBox ({ character, status }: CharacterBoxProps) {
  return (
    <span
      className='character-box'
      data-testid='character-box'
      data-status={status}
    >
      {character}
    </span>
  )
}

export default CharacterBox

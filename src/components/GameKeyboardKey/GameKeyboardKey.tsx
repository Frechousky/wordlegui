import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { KEY_BACKSPACE, KEY_RETURN } from '../../constants'
import { CharacterStatus } from '../../constants'
import { MouseEventHandler } from 'react'

import './GameKeyboardKey.css'

export type GameKeyboardKeyProps = {
  value: string
  status: CharacterStatus
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

function GameKeyboardKey ({
  value,
  status,
  handleOnClick
}: GameKeyboardKeyProps) {
  return (
    <button
      className='game-keyboard-key'
      data-testid={`game-keyboard-key-${value}`}
      data-status={status}
      data-value={value}
      onClick={handleOnClick}
    >
      {value === KEY_BACKSPACE ? (
        <FontAwesomeIcon icon={faDeleteLeft} />
      ) : value === KEY_RETURN ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        value
      )}
    </button>
  )
}

export default GameKeyboardKey

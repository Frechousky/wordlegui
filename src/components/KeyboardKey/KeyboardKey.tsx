import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import {
  KEY_BACKSPACE,
  LetterStatus,
  KEY_RETURN,
  KeyboardKeyType
} from '../../model'
import { MouseEventHandler } from 'react'

import './KeyboardKey.css'

export type KeyboardKeyProps = {
  value: KeyboardKeyType
  status: LetterStatus
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

function KeyboardKey ({ value, status, handleOnClick }: KeyboardKeyProps) {
  return (
    <button
      className='keyboard-key'
      data-testid={`keyboard-key-${value}`}
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

export default KeyboardKey

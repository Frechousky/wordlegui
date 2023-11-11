import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { BACKSPACE_KEY, LetterStatus, RETURN_KEY } from '../../model'
import { MouseEventHandler } from 'react'

import './KeyboardKey.css'

export type KeyboardKeyProps = {
  value: string
  status: LetterStatus
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

function KeyboardKey ({ value, status, handleOnClick }: KeyboardKeyProps) {
  let className = 'keyboard-key '
  switch (status) {
    case LetterStatus.GOOD_POSITION:
      className += 'good-position'
      break
    case LetterStatus.BAD_POSITION:
      className += 'bad-position'
      break
    case LetterStatus.NOT_PRESENT:
      className += 'not-present'
      break
    case LetterStatus.UNKNOWN:
      className += 'unknown'
      break
  }
  return (
    <button
      className={className}
      data-testid='keyboard-key'
      onClick={handleOnClick}
    >
      {value === BACKSPACE_KEY ? (
        <FontAwesomeIcon icon={faDeleteLeft} />
      ) : value === RETURN_KEY ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        value.toUpperCase()
      )}
    </button>
  )
}

export default KeyboardKey

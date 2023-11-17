import { MouseEventHandler } from 'react'
import {
  CharacterStatus,
  KEY_BACKSPACE,
  KEY_EMPTY,
  KEY_RETURN
} from '../../constants'

import { Backspace, Send } from '@mui/icons-material'
import { Button } from '@mui/material'

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
    <Button
      variant='contained'
      data-testid={`game-keyboard-key-${value}`}
      data-status={status}
      data-value={value}
      disabled={value === KEY_EMPTY}
      onClick={handleOnClick}
    >
      {value === KEY_BACKSPACE ? (
        <Backspace />
      ) : value === KEY_RETURN ? (
        <Send />
      ) : value === KEY_EMPTY ? (
        ''
      ) : (
        value
      )}
    </Button>
  )
}

export default GameKeyboardKey

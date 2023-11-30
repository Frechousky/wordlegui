import { MouseEventHandler } from 'react'
import {
  CharacterStatus,
  KEY_BACKSPACE,
  KEY_EMPTY,
  KEY_RETURN
} from '../../constants'

import { Backspace, Send } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'

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
  const button = (
    <Button
      variant='contained'
      data-testid={`game-keyboard-key-${value}`}
      data-status={status}
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
  if (value === KEY_EMPTY) {
    return button
  }
  return (
    <Tooltip
      title={
        value === KEY_BACKSPACE
          ? 'Effacer'
          : value === KEY_RETURN
          ? 'Soumettre'
          : `Touche ${value}`
      }
    >
      {button}
    </Tooltip>
  )
}

export default GameKeyboardKey

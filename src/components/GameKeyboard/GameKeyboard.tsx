import { MouseEventHandler, ReactElement } from 'react'
import { KEY_BACKSPACE, KEY_EMPTY, KEY_RETURN } from '../../constants'
import { CharacterStatus, Keyboard } from '../../constants'
import GameKeyboardKey from '../GameKeyboardKey/GameKeyboardKey'

import { Box, ButtonGroup } from '@mui/material'

export type GameKeyboardProps = {
  keyboard: Keyboard
  handleOnCharacterClickWrapper?: (
    key: string
  ) => MouseEventHandler<HTMLButtonElement>
  handleOnBackspaceClick?: MouseEventHandler<HTMLButtonElement>
  handleOnReturnClick?: MouseEventHandler<HTMLButtonElement>
}

function GameKeyboard ({
  keyboard,
  handleOnCharacterClickWrapper,
  handleOnBackspaceClick,
  handleOnReturnClick
}: GameKeyboardProps) {
  const keyboardRows: ReactElement[] = []
  keyboard.keys.forEach((row, idx) => {
    const keyboardRow: ReactElement[] = []
    row.forEach(key => {
      keyboardRow.push(
        <GameKeyboardKey
          value={key}
          status={CharacterStatus.UNKNOWN}
          key={key}
          handleOnClick={
            key === KEY_BACKSPACE
              ? handleOnBackspaceClick
              : key === KEY_RETURN
              ? handleOnReturnClick
              : key === KEY_EMPTY
              ? undefined
              : handleOnCharacterClickWrapper &&
                handleOnCharacterClickWrapper(key)
          }
        />
      )
    })
    keyboardRows.push(
      <ButtonGroup fullWidth key={idx}>
        {keyboardRow}
      </ButtonGroup>
    )
  })
  return <Box>{keyboardRows}</Box>
}

export default GameKeyboard

import { MouseEventHandler, ReactElement } from 'react'
import {
  BACKSPACE_KEY,
  KEYBOARD_ROW_DELIM,
  LetterStatus,
  RETURN_KEY
} from '../../model'
import KeyboardKey from '../KeyboardKey/KeyboardKey'

import './Keyboard.css'

export type KeyboardProps = {
  keys: string
  handleOnLetterClickWrapper?: (
    key: string
  ) => MouseEventHandler<HTMLButtonElement>
  handleOnBackspaceClick?: MouseEventHandler<HTMLButtonElement>
  handleOnReturnClick?: MouseEventHandler<HTMLButtonElement>
}

function Keyboard ({
  keys,
  handleOnLetterClickWrapper,
  handleOnBackspaceClick,
  handleOnReturnClick
}: KeyboardProps) {
  const keyRows: ReactElement[] = []
  keys.split(KEYBOARD_ROW_DELIM).forEach((row, idx) => {
    const keyRow: ReactElement[] = []
    row.split('').forEach(key => {
      keyRow.push(
        <KeyboardKey
          value={key}
          status={LetterStatus.UNKNOWN}
          key={key}
          handleOnClick={
            key === BACKSPACE_KEY
              ? handleOnBackspaceClick
              : key === RETURN_KEY
              ? handleOnReturnClick
              : handleOnLetterClickWrapper && handleOnLetterClickWrapper(key)
          }
        />
      )
    })
    keyRows.push(
      <div className='keyboard-row-container' key={idx}>
        {keyRow}
      </div>
    )
  })
  return <div className='keyboard-container'>{keyRows}</div>
}

export default Keyboard

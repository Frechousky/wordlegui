import { MouseEventHandler, ReactElement } from 'react'
import { KEY_BACKSPACE, LetterStatus, KEY_RETURN } from '../../model'
import KeyboardKey from '../KeyboardKey/KeyboardKey'

import './Keyboard.css'

export type KeyboardProps = {
  keys: string[][]
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
  keys.forEach((row, idx) => {
    const keyRow: ReactElement[] = []
    row.forEach(key => {
      keyRow.push(
        <KeyboardKey
          value={key}
          status={LetterStatus.UNKNOWN}
          key={key}
          handleOnClick={
            key === KEY_BACKSPACE
              ? handleOnBackspaceClick
              : key === KEY_RETURN
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

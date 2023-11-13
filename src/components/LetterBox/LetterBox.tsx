import {
  STATUS_GOOD_POSITION,
  STATUS_BAD_POSITION,
  STATUS_NOT_PRESENT,
  STATUS_UNKNOWN
} from '../../model'
import { LetterStatus } from '../../model'

import './LetterBox.css'

type LetterBoxProps = {
  letter: string
  status: LetterStatus
}

function LetterBox ({ letter, status }: LetterBoxProps) {
  let dataStatus = ''
  switch (status) {
    case LetterStatus.GOOD_POSITION:
      dataStatus = STATUS_GOOD_POSITION
      break
    case LetterStatus.BAD_POSITION:
      dataStatus = STATUS_BAD_POSITION
      break
    case LetterStatus.NOT_PRESENT:
      dataStatus = STATUS_NOT_PRESENT
      break
    case LetterStatus.UNKNOWN:
      dataStatus = STATUS_UNKNOWN
      break
  }
  return (
    <span
      className='letter-box'
      data-testid='letter-box'
      data-status={dataStatus}
    >
      {letter.toUpperCase()}
    </span>
  )
}

export default LetterBox

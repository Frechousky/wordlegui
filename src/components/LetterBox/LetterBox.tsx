import { LetterBoxType } from '../../model'
import { LetterStatus } from '../../model'

import './LetterBox.css'

type LetterBoxProps = {
  value: LetterBoxType
  status: LetterStatus
}

function LetterBox ({ value, status }: LetterBoxProps) {
  return (
    <span className='letter-box' data-testid='letter-box' data-status={status}>
      {value}
    </span>
  )
}

export default LetterBox

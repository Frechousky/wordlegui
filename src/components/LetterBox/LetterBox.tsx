import { LetterStatus } from '../../model'

import './LetterBox.css'

type LetterBoxProps = {
  value: string
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

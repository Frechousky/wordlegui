import { LetterStatus } from '../../model'

type LetterBoxProps = {
  letter: string
  status: LetterStatus
}

function LetterBox (props: LetterBoxProps) {
  let className = 'letter-box '
  switch (props.status) {
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
    <span className={className} data-testid='letter-box'>
      {props.letter.toUpperCase()}
    </span>
  )
}

export default LetterBox

export enum LetterBoxStatus {
  GOOD_POSITION,
  BAD_POSITION,
  NOT_PRESENT,
  UNKNOWN
}

export type LetterBoxProps = {
  letter: string
  status: LetterBoxStatus
}

function LetterBox (props: LetterBoxProps) {
  let className = 'letter-box '
  switch (props.status) {
    case LetterBoxStatus.GOOD_POSITION:
      className += 'good-position'
      break
    case LetterBoxStatus.BAD_POSITION:
      className += 'bad-position'
      break
    case LetterBoxStatus.NOT_PRESENT:
      className += 'not-present'
      break
    case LetterBoxStatus.UNKNOWN:
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

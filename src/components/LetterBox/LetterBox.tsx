import styles from './LetterBox.module.css'

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
  let className = ''
  switch (props.status) {
    case LetterBoxStatus.GOOD_POSITION:
      className = styles.goodPosition
      break
    case LetterBoxStatus.BAD_POSITION:
      className = styles.badPosition
      break
    case LetterBoxStatus.NOT_PRESENT:
      className = styles.notPresent
      break
    case LetterBoxStatus.UNKNOWN:
      className = styles.unknown
      break
  }
  return (
    <span
      className={`${styles.letterBox} ${className}`}
      data-testid='letter-box'
    >
      {props.letter.toUpperCase()}
    </span>
  )
}

export default LetterBox

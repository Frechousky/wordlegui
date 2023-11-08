import { render, screen } from '@testing-library/react'
import LetterBox, { LetterBoxStatus } from './LetterBox'
import styles from './LetterBox.module.css'

test.each('abcdefghijklmnopqrstuvwxyz'.split(''))(
  "renders input letter '%s' in uppercase",
  (letter: string) => {
    render(<LetterBox letter={letter} status={LetterBoxStatus.UNKNOWN} />)

    const lb = screen.getByTestId('letter-box')

    expect(lb).toHaveTextContent(letter.toUpperCase())
  }
)

test.each([
  [
    `${styles.letterBox}  ${styles.goodPosition}`,
    LetterBoxStatus.GOOD_POSITION
  ],
  [`${styles.letterBox}  ${styles.badPosition}`, LetterBoxStatus.BAD_POSITION],
  [`${styles.letterBox}  ${styles.notPresent}`, LetterBoxStatus.NOT_PRESENT],
  [`${styles.letterBox}  ${styles.unknown}`, LetterBoxStatus.UNKNOWN]
])(
  "has css classes '%s' when status is %s",
  (expectedClass: string, status: LetterBoxStatus) => {
    render(<LetterBox letter='a' status={status} />)

    const lb = screen.getByTestId('letter-box')

    expect(lb).toHaveClass(expectedClass)
  }
)

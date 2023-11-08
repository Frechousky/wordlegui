import { render, screen } from '@testing-library/react'
import LetterBox, { LetterBoxStatus } from './LetterBox'
import styles from './LetterBox.module.css'

test.each('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))(
  'renders %s letter in uppercase',
  (letter: string) => {
    render(<LetterBox letter={letter} status={LetterBoxStatus.UNKNOWN} />)
    const lb = screen.getByText(new RegExp(letter, 'i'))
    expect(lb).toBeInTheDocument()
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
    const letter = 'a'
    render(<LetterBox letter={letter} status={status} />)
    const lb = screen.getByText(new RegExp(letter, 'i'))
    expect(lb).toHaveClass(expectedClass)
  }
)

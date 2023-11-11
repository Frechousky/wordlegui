import { render, screen } from '@testing-library/react'
import LetterBox from './LetterBox'
import { LetterStatus } from '../../model'

test.each('abcdefghijklmnopqrstuvwxyz'.split(''))(
  "renders input letter '%s' in uppercase",
  (letter: string) => {
    render(<LetterBox letter={letter} status={LetterStatus.UNKNOWN} />)

    const lb = screen.getByTestId('letter-box')

    expect(lb).toHaveTextContent(letter.toUpperCase())
  }
)

test.each([
  ['letter-box good-position', LetterStatus.GOOD_POSITION],
  ['letter-box bad-position', LetterStatus.BAD_POSITION],
  ['letter-box not-present', LetterStatus.NOT_PRESENT],
  ['letter-box unknown', LetterStatus.UNKNOWN]
])(
  "has css classes '%s' when status is %s",
  (expectedClass: string, status: LetterStatus) => {
    render(<LetterBox letter='a' status={status} />)

    const lb = screen.getByTestId('letter-box')

    expect(lb).toHaveClass(expectedClass)
  }
)

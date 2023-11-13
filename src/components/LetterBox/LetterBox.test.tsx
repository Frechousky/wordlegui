import { render, screen } from '@testing-library/react'
import LetterBox from './LetterBox'
import {
  STATUS_BAD_POSITION,
  STATUS_GOOD_POSITION,
  STATUS_NOT_PRESENT,
  STATUS_UNKNOWN
} from '../../model'
import { LetterStatus } from '../../model'

test.each('abcdefghijklmnopqrstuvwxyz'.split(''))(
  "renders input letter '%s' in uppercase",
  (letter: string) => {
    render(<LetterBox letter={letter} status={LetterStatus.UNKNOWN} />)

    const lb = screen.getByTestId('letter-box')

    expect(lb).toHaveTextContent(new RegExp(`^${letter.toUpperCase()}$`))
  }
)

test.each([
  [STATUS_GOOD_POSITION, LetterStatus.GOOD_POSITION],
  [STATUS_BAD_POSITION, LetterStatus.BAD_POSITION],
  [STATUS_NOT_PRESENT, LetterStatus.NOT_PRESENT],
  [STATUS_UNKNOWN, LetterStatus.UNKNOWN]
])(
  "has data-status '%s' when status is %s",
  (expectedDataStatus: string, status: LetterStatus) => {
    render(<LetterBox letter='a' status={status} />)

    const lb = screen.getByTestId('letter-box')

    expect(lb).toHaveAttribute('data-status', expectedDataStatus)
  }
)

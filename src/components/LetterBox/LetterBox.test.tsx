import { render, screen } from '@testing-library/react'
import LetterBox from './LetterBox'
import { LetterBoxType } from '../../model'
import { LetterStatus } from '../../model'

test.each('ABCDEFGHIJKLNOPQRSTUVWXYZ_'.split('') as LetterBoxType[])(
  "renders input letter '%s'",
  (letter: LetterBoxType) => {
    render(<LetterBox value={letter} status={LetterStatus.UNKNOWN} />)

    const lb = screen.getByTestId('letter-box')

    expect(lb).toHaveTextContent(new RegExp(`^${letter}$`))
  }
)

test.each([
  LetterStatus.GOOD_POSITION,
  LetterStatus.BAD_POSITION,
  LetterStatus.NOT_PRESENT,
  LetterStatus.UNKNOWN
])('has correct data-status', (status: LetterStatus) => {
  render(<LetterBox value='A' status={status} />)

  const lb = screen.getByTestId('letter-box')

  expect(lb).toHaveAttribute('data-status', `${status}`)
})

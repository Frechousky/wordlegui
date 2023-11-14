import { render, screen } from '@testing-library/react'
import LetterBox from './LetterBox'
import { LetterStatus } from '../../model'

test.each('ABCDEFGHIJKLNOPQRSTUVWXYZ_'.split(''))(
  "renders input letter '%s'",
  (letter: string) => {
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

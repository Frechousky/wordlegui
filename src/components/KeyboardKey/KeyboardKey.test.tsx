import { render, screen } from '@testing-library/react'
import { BACKSPACE_KEY, LetterStatus, RETURN_KEY } from '../../model'
import KeyboardKey from './KeyboardKey'

test.each('abcdefghijklmnopqrstuvwxyz'.split(''))(
  "renders '%s' key correctly",
  (key: string) => {
    render(<KeyboardKey value={key} status={LetterStatus.GOOD_POSITION} />)

    const kk = screen.getByRole('button')

    expect(kk).toHaveTextContent(new RegExp(`^${key.toUpperCase()}$`))
  }
)

test("renders 'backspace' key correctly", () => {
  render(<KeyboardKey value={BACKSPACE_KEY} status={LetterStatus.UNKNOWN} />)

  const kk = screen.getByRole('button')
  const icon = screen.getByRole('img', { hidden: true })

  expect(kk).toHaveTextContent('')
  expect(icon).toHaveClass('fa-delete-left')
})

test("renders 'return' key correctly", () => {
  render(<KeyboardKey value={RETURN_KEY} status={LetterStatus.UNKNOWN} />)

  const kk = screen.getByRole('button')
  const icon = screen.getByRole('img', { hidden: true })

  expect(kk).toHaveTextContent('')
  expect(icon).toHaveClass('fa-check')
})

test.each([
  ['keyboard-key good-position', LetterStatus.GOOD_POSITION],
  ['keyboard-key bad-position', LetterStatus.BAD_POSITION],
  ['keyboard-key not-present', LetterStatus.NOT_PRESENT],
  ['keyboard-key unknown', LetterStatus.UNKNOWN]
])(
  'has correct css classes when status is %s',
  (expectedClass: string, status: LetterStatus) => {
    render(<KeyboardKey value='a' status={status} />)

    const kk = screen.getByRole('button')

    expect(kk).toHaveClass(expectedClass)
  }
)

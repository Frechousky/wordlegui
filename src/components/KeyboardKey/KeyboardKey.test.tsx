import { render, screen } from '@testing-library/react'
import {
  KEY_BACKSPACE,
  LetterStatus,
  KEY_RETURN,
  KeyboardKeyType
} from '../../model'
import KeyboardKey from './KeyboardKey'

test.each('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') as KeyboardKeyType[])(
  "renders '%s' key correctly",
  (key: KeyboardKeyType) => {
    render(<KeyboardKey value={key} status={LetterStatus.GOOD_POSITION} />)

    const kk = screen.getByRole('button')

    expect(kk).toHaveTextContent(new RegExp(`^${key}$`))
  }
)

test("renders 'backspace' key correctly", () => {
  render(<KeyboardKey value={KEY_BACKSPACE} status={LetterStatus.UNKNOWN} />)

  const kk = screen.getByRole('button')
  const icon = screen.getByRole('img', { hidden: true })

  expect(kk).toHaveTextContent('')
  expect(icon).toHaveClass('fa-delete-left')
})

test("renders 'return' key correctly", () => {
  render(<KeyboardKey value={KEY_RETURN} status={LetterStatus.UNKNOWN} />)

  const kk = screen.getByRole('button')
  const icon = screen.getByRole('img', { hidden: true })

  expect(kk).toHaveTextContent('')
  expect(icon).toHaveClass('fa-check')
})

test.each([
  LetterStatus.GOOD_POSITION,
  LetterStatus.BAD_POSITION,
  LetterStatus.NOT_PRESENT,
  LetterStatus.UNKNOWN
])('has correct data-status', (status: LetterStatus) => {
  render(<KeyboardKey value='A' status={status} />)

  const kk = screen.getByRole('button')

  expect(kk).toHaveAttribute('data-status', `${status}`)
})

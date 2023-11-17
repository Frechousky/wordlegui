import { render, screen } from '@testing-library/react'
import { KEY_BACKSPACE, KEY_EMPTY, KEY_RETURN } from '../../constants'
import { CharacterStatus } from '../../constants'
import GameKeyboardKey from './GameKeyboardKey'

test.each('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))(
  "renders '%s' key correctly",
  (key: string) => {
    render(
      <GameKeyboardKey value={key} status={CharacterStatus.GOOD_POSITION} />
    )

    const kk = screen.getByRole('button')

    expect(kk).toHaveTextContent(new RegExp(`^${key}$`))
  }
)

test("renders 'backspace' key correctly", () => {
  render(
    <GameKeyboardKey value={KEY_BACKSPACE} status={CharacterStatus.UNKNOWN} />
  )

  const kk = screen.getByRole('button')
  const icon = screen.getByTestId('BackspaceIcon')

  expect(kk).toHaveTextContent('')
  expect(icon).toBeInTheDocument()
})

test("renders 'return' key correctly", () => {
  render(
    <GameKeyboardKey value={KEY_RETURN} status={CharacterStatus.UNKNOWN} />
  )

  const kk = screen.getByRole('button')
  const icon = screen.getByTestId('SendIcon')

  expect(kk).toHaveTextContent('')
  expect(icon).toBeInTheDocument()
})

test("renders 'empty' key correctly", () => {
  render(<GameKeyboardKey value={KEY_EMPTY} status={CharacterStatus.UNKNOWN} />)

  const kk = screen.getByRole('button')

  expect(kk).toHaveTextContent('')
  expect(kk).toHaveAttribute('disabled')
})

test.each([
  CharacterStatus.GOOD_POSITION,
  CharacterStatus.BAD_POSITION,
  CharacterStatus.NOT_PRESENT,
  CharacterStatus.UNKNOWN
])('has correct data-status', (status: CharacterStatus) => {
  render(<GameKeyboardKey value='A' status={status} />)

  const kk = screen.getByRole('button')

  expect(kk).toHaveAttribute('data-status', `${status}`)
})

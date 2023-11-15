import { render, screen } from '@testing-library/react'
import { KEY_BACKSPACE, KEY_RETURN } from '../../constants'
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
  const icon = screen.getByRole('img', { hidden: true })

  expect(kk).toHaveTextContent('')
  expect(icon).toHaveClass('fa-delete-left')
})

test("renders 'return' key correctly", () => {
  render(
    <GameKeyboardKey value={KEY_RETURN} status={CharacterStatus.UNKNOWN} />
  )

  const kk = screen.getByRole('button')
  const icon = screen.getByRole('img', { hidden: true })

  expect(kk).toHaveTextContent('')
  expect(icon).toHaveClass('fa-check')
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

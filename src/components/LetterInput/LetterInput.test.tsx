import { render, screen } from '@testing-library/react'
import { CharacterStatus } from '../../constants'
import LetterInput from './LetterInput'

it.each('abcdefghijklnopqrstuvwxyzABCDEFGHIJKLNOPQRSTUVWXYZ_'.split(''))(
  "renders input character '%s'",
  (character: string) => {
    render(
      <LetterInput character={character} status={CharacterStatus.UNKNOWN} />
    )

    const letterInput = screen.getByTestId('letter-input')

    expect(letterInput).toHaveAttribute('value', character)
  }
)

it.each([
  CharacterStatus.WELL_PLACED,
  CharacterStatus.MISPLACED,
  CharacterStatus.NOT_PRESENT,
  CharacterStatus.UNKNOWN
])('has correct data-status', (status: CharacterStatus) => {
  render(<LetterInput character='A' status={status} />)

  const cb = screen.getByTestId('letter-input')

  expect(cb).toHaveAttribute('data-status', `${status}`)
})

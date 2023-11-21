import { render, screen } from '@testing-library/react'
import LetterInput from './LetterInput'
import { CharacterStatus } from '../../constants'

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
  CharacterStatus.GOOD_POSITION,
  CharacterStatus.BAD_POSITION,
  CharacterStatus.NOT_PRESENT,
  CharacterStatus.UNKNOWN
])('has correct data-status', (status: CharacterStatus) => {
  render(<LetterInput character='A' status={status} />)

  const cb = screen.getByTestId('letter-input')

  expect(cb).toHaveAttribute('data-status', `${status}`)
})

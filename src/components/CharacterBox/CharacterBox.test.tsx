import { render, screen } from '@testing-library/react'
import CharacterBox from './CharacterBox'
import { CharacterStatus } from '../../constants'

test.each('ABCDEFGHIJKLNOPQRSTUVWXYZ_'.split(''))(
  "renders input character '%s'",
  (character: string) => {
    render(
      <CharacterBox character={character} status={CharacterStatus.UNKNOWN} />
    )

    const lb = screen.getByTestId('character-box')

    expect(lb).toHaveTextContent(new RegExp(`^${character}$`))
  }
)

test.each([
  CharacterStatus.GOOD_POSITION,
  CharacterStatus.BAD_POSITION,
  CharacterStatus.NOT_PRESENT,
  CharacterStatus.UNKNOWN
])('has correct data-status', (status: CharacterStatus) => {
  render(<CharacterBox character='A' status={status} />)

  const lb = screen.getByTestId('character-box')

  expect(lb).toHaveAttribute('data-status', `${status}`)
})

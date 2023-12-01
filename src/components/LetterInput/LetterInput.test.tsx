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
  [CharacterStatus.WELL_PLACED, 'well-placed'],
  [CharacterStatus.MISPLACED, 'misplaced'],
  [CharacterStatus.NOT_PRESENT, 'not-present'],
  [CharacterStatus.UNKNOWN, 'unknown']
])(
  'renders status correctly',
  (status: CharacterStatus, expectedCss: string) => {
    render(<LetterInput character='A' status={status} />)

    const letterInput = screen.getByTestId('letter-input')

    expect(letterInput).toHaveClass(expectedCss)
    expect(letterInput).toHaveAttribute('data-status', `${status}`)
  }
)

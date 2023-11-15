import { render, screen } from '@testing-library/react'
import GameGrid from './GameGrid'
import assert from 'assert'
import { CharacterStatus as CS, LETTER_UNKNOWN } from '../../constants'
import { StatusPositionMap } from '../../persistence'

test.each([
  [6, ['AZERTY', 'ABATTU', 'FIABLE', 'LAMPER', 'LEZARD', 'MAUDIT', 'MERLAN']]
])(
  'throws error when there are more words than max attempts',
  (maxAttempts: number, words: string[]) => {
    assert(maxAttempts < words.length)

    const f = () => {
      render(
        <GameGrid
          maxAttempts={maxAttempts}
          wordLength={6}
          words={words}
          statuses={{}}
        />
      )
    }

    expect(f).toThrowError(new RegExp('Invalid word count'))
  }
)

test.each([
  [
    6,
    [
      'AZERTY',
      'AXE',
      'FIABLE',
      LETTER_UNKNOWN.repeat(6),
      LETTER_UNKNOWN.repeat(6),
      LETTER_UNKNOWN.repeat(6)
    ]
  ],
  [
    6,
    [
      'AZERTY',
      'LAMPER',
      'ABRARACOURCIX',
      LETTER_UNKNOWN.repeat(6),
      LETTER_UNKNOWN.repeat(6),
      LETTER_UNKNOWN.repeat(6)
    ]
  ]
])(
  'throws error when at least one word is not word length characters long',
  (wordLength: number, words: string[]) => {
    assert(words.some(v => v.length !== wordLength))

    const f = () => {
      render(
        <GameGrid
          maxAttempts={6}
          wordLength={wordLength}
          words={words}
          statuses={{}}
        />
      )
    }

    expect(f).toThrowError(new RegExp('At least one word with invalid length'))
  }
)

test('renders correctly', () => {
  const maxAttempts = 6
  const wordLength = 6
  const words = [
    'AZERTY',
    'LAMPER',
    'FIABLE',
    LETTER_UNKNOWN.repeat(6),
    LETTER_UNKNOWN.repeat(6),
    LETTER_UNKNOWN.repeat(6)
  ]
  const statuses: StatusPositionMap = {
    A: {},
    Z: {},
    E: {},
    R: {},
    T: {},
    Y: {},
    L: {},
    M: {},
    P: {},
    F: {},
    I: {},
    B: {},
    _: {}
  }
  statuses['A'][0] = CS.BAD_POSITION
  statuses['Z'][1] = CS.NOT_PRESENT
  statuses['E'][2] = CS.BAD_POSITION
  statuses['R'][3] = CS.NOT_PRESENT
  statuses['T'][4] = CS.NOT_PRESENT
  statuses['Y'][5] = CS.NOT_PRESENT

  statuses['L'][0] = CS.BAD_POSITION
  statuses['A'][1] = CS.BAD_POSITION
  statuses['M'][2] = CS.NOT_PRESENT
  statuses['P'][3] = CS.NOT_PRESENT
  statuses['E'][4] = CS.BAD_POSITION
  statuses['R'][5] = CS.NOT_PRESENT

  statuses['F'][0] = CS.GOOD_POSITION
  statuses['I'][1] = CS.GOOD_POSITION
  statuses['A'][2] = CS.GOOD_POSITION
  statuses['B'][3] = CS.GOOD_POSITION
  statuses['L'][4] = CS.GOOD_POSITION
  statuses['E'][5] = CS.GOOD_POSITION

  statuses[LETTER_UNKNOWN][0] = CS.UNKNOWN
  statuses[LETTER_UNKNOWN][1] = CS.UNKNOWN
  statuses[LETTER_UNKNOWN][2] = CS.UNKNOWN
  statuses[LETTER_UNKNOWN][3] = CS.UNKNOWN
  statuses[LETTER_UNKNOWN][4] = CS.UNKNOWN
  statuses[LETTER_UNKNOWN][5] = CS.UNKNOWN

  render(
    <GameGrid
      maxAttempts={maxAttempts}
      wordLength={wordLength}
      words={words}
      statuses={statuses}
    />
  )

  const characterBoxes = screen.getAllByTestId('character-box')

  expect(characterBoxes).toHaveLength(maxAttempts * wordLength)
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < wordLength; j++) {
      const currentLB = characterBoxes[i * wordLength + j]
      const character = words[i].charAt(j).toUpperCase()
      let status = statuses[character][j]
      expect(currentLB).toHaveTextContent(character)
      expect(currentLB).toHaveAttribute('data-status', `${status}`)
    }
  }
})

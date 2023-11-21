import { render, screen } from '@testing-library/react'
import { CharacterStatus as CS, LETTER_UNKNOWN } from '../../constants'
import GameGrid from './GameGrid'

it('renders correctly', () => {
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
  const statuses = [
    [
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT
    ],
    [
      CS.BAD_POSITION,
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT,
      CS.BAD_POSITION,
      CS.NOT_PRESENT
    ],
    [
      CS.GOOD_POSITION,
      CS.GOOD_POSITION,
      CS.GOOD_POSITION,
      CS.GOOD_POSITION,
      CS.GOOD_POSITION,
      CS.GOOD_POSITION
    ],
    Array(6).fill(CS.UNKNOWN),
    Array(6).fill(CS.UNKNOWN),
    Array(6).fill(CS.UNKNOWN)
  ]

  render(
    <GameGrid
      words={words}
      statuses={statuses}
      wordLength={6}
      maxAttempts={6}
    />
  )

  const letterInputs = screen.getAllByTestId('letter-input')

  expect(letterInputs).toHaveLength(maxAttempts * wordLength)
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < wordLength; j++) {
      const currentLetterInput = letterInputs[i * wordLength + j]
      const character = words[i].charAt(j)
      let status = statuses[i][j]
      expect(currentLetterInput).toHaveAttribute('value', character)
      expect(currentLetterInput).toHaveAttribute('data-status', `${status}`)
    }
  }
})

it('fills with unknown characters and unknown statuses when word list and/or status list is not complete', () => {
  const maxAttempts = 6
  const wordLength = 6
  const words = ['AZERTY', 'LAMPER', 'FIA']
  const statuses = [
    [
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT
    ],
    [
      CS.BAD_POSITION,
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT,
      CS.BAD_POSITION,
      CS.NOT_PRESENT
    ]
  ]

  render(
    <GameGrid
      words={words}
      statuses={statuses}
      wordLength={6}
      maxAttempts={6}
    />
  )

  const letterInputs = screen.getAllByTestId('letter-input')
  const expectedWords = [
    'AZERTY',
    'LAMPER',
    'FIA___',
    '______',
    '______',
    '______'
  ]
  const expectedStatuses = [
    [
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT
    ],
    [
      CS.BAD_POSITION,
      CS.BAD_POSITION,
      CS.NOT_PRESENT,
      CS.NOT_PRESENT,
      CS.BAD_POSITION,
      CS.NOT_PRESENT
    ],
    [CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN],
    [CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN],
    [CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN],
    [CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN, CS.UNKNOWN]
  ]
  expect(letterInputs).toHaveLength(maxAttempts * wordLength)
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < wordLength; j++) {
      const currentLetterInput = letterInputs[i * wordLength + j]
      const character = expectedWords[i].charAt(j)
      const status = expectedStatuses[i][j]
      expect(currentLetterInput).toHaveAttribute('value', character)
      expect(currentLetterInput).toHaveAttribute('data-status', `${status}`)
    }
  }
})

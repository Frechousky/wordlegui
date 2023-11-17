import { render, screen } from '@testing-library/react'
import GameGrid from './GameGrid'
import assert from 'assert'
import {
  CharacterStatus as CS,
  CharacterStatus,
  LETTER_UNKNOWN
} from '../../constants'

test.each([
  [['AZERTY', 'ABATTU', 'FIABLE'], []],
  [
    ['AZERTY', 'ABATTU', 'FIABLE'],
    [
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ]
    ]
  ],
  [
    ['AZERTY', 'ABATTU', 'FIABLE'],
    [
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ]
    ]
  ]
])(
  'throws error when words and statuses length do not match',
  (words: string[], statuses: CharacterStatus[][]) => {
    assert(words.length !== statuses.length)

    expect(() => {
      render(<GameGrid words={words} statuses={statuses} />)
    }).toThrowError(new RegExp('Words and statuses count does not match'))
  }
)

test.each([
  [['AZERTY', 'AXE', 'FIABLE']],
  [['AZERTY', 'LAMPER', 'ABRARACOURCIX']]
])(
  'throws error when all word does not have same length',
  (words: string[]) => {
    const wordLength = words[0].length
    assert(words.some(v => v.length !== wordLength))

    const statuses = [
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ]
    ]

    expect(() => {
      render(<GameGrid words={words} statuses={statuses} />)
    }).toThrowError(new RegExp('At least one word with invalid length'))
  }
)

test.each([
  [
    [
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ]
    ]
  ],
  [
    [
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ],
      [],
      [
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION,
        CharacterStatus.BAD_POSITION
      ]
    ]
  ]
])(
  'throws error when all status does not have same length',
  (statuses: CharacterStatus[][]) => {
    const words = ['AZERTY', 'FIABLE', 'LAMPER']
    const wordLength = words[0].length
    assert(statuses.some(v => v.length !== wordLength))

    expect(() => {
      render(<GameGrid words={words} statuses={statuses} />)
    }).toThrowError(new RegExp('At least one status with invalid length'))
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

  render(<GameGrid words={words} statuses={statuses} />)

  const characterBoxes = screen.getAllByTestId('character-box')

  expect(characterBoxes).toHaveLength(maxAttempts * wordLength)
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < wordLength; j++) {
      const currentLB = characterBoxes[i * wordLength + j]
      const character = words[i].charAt(j).toUpperCase()
      let status = statuses[i][j]
      expect(currentLB).toHaveTextContent(character)
      expect(currentLB).toHaveAttribute('data-status', `${status}`)
    }
  }
})

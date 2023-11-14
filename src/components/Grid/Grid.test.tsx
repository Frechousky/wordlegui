import { render, screen } from '@testing-library/react'
import Grid from './Grid'
import assert from 'assert'
import { LetterStatus as LS } from '../../model'

test.each([
  [6, ['azerty', 'abattu', 'fiable', 'lamper', 'lezard', 'maudit', 'merlan']]
])(
  'throws error when there are more words than max attempts',
  (maxAttempts: number, words: string[]) => {
    assert(maxAttempts < words.length)

    const f = () => {
      render(
        <Grid
          maxAttempts={maxAttempts}
          wordLength={6}
          words={words}
          statuses={[]}
        />
      )
    }

    expect(f).toThrowError(new RegExp('invalid word count'))
  }
)

test.each([
  [6, ['azerty', 'axe', 'fiable', '______', '______', '______']],
  [6, ['azerty', 'lamper', 'abraracourcix', '______', '______', '______']]
])(
  'throws error when at least one word is not word length characters long',
  (wordLength: number, words: string[]) => {
    assert(words.some(v => v.length !== wordLength))

    const f = () => {
      render(
        <Grid
          maxAttempts={6}
          wordLength={wordLength}
          words={words}
          statuses={[]}
        />
      )
    }

    expect(f).toThrowError(new RegExp('at least one word with invalid length'))
  }
)

test.each([
  [
    6,
    ['azerty', 'lamper', 'fiable', '______', '______', '______'],
    [
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN]
    ]
  ],
  [
    6,
    ['azerty', 'lamper', 'fiable', '______', '______', '______'],
    [
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN]
    ]
  ]
])(
  'throws error when at least one word is not word length characters long',
  (maxAttempts: number, words: string[], statuses: LS[][]) => {
    assert(statuses.length !== maxAttempts)

    const f = () => {
      render(
        <Grid
          maxAttempts={maxAttempts}
          wordLength={6}
          words={words}
          statuses={statuses}
        />
      )
    }

    expect(f).toThrowError(new RegExp('invalid status count'))
  }
)

test.each([
  [
    6,
    ['azerty', 'lamper', 'fiable', '______', '______', '______'],
    [
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN]
    ]
  ],
  [
    6,
    ['azerty', 'lamper', 'fiable', '______', '______', '______'],
    [
      [
        LS.UNKNOWN,
        LS.UNKNOWN,
        LS.UNKNOWN,
        LS.UNKNOWN,
        LS.UNKNOWN,
        LS.UNKNOWN,
        LS.UNKNOWN,
        LS.UNKNOWN,
        LS.UNKNOWN
      ],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN]
    ]
  ]
])(
  'throws error when at least one status is not word length long',
  (wordLength: number, words: string[], statuses: LS[][]) => {
    assert(statuses.some(v => v.length !== wordLength))

    const f = () => {
      render(
        <Grid
          maxAttempts={6}
          wordLength={wordLength}
          words={words}
          statuses={statuses}
        />
      )
    }

    expect(f).toThrowError(
      new RegExp('at least one status with invalid length')
    )
  }
)

test.each([
  [
    6,
    6,
    ['azerty', 'lamper', 'fiable', '______', '______', '______'],
    [
      [
        LS.BAD_POSITION,
        LS.NOT_PRESENT,
        LS.BAD_POSITION,
        LS.NOT_PRESENT,
        LS.NOT_PRESENT,
        LS.NOT_PRESENT
      ],
      [
        LS.BAD_POSITION,
        LS.BAD_POSITION,
        LS.NOT_PRESENT,
        LS.NOT_PRESENT,
        LS.BAD_POSITION,
        LS.NOT_PRESENT
      ],
      [
        LS.GOOD_POSITION,
        LS.GOOD_POSITION,
        LS.GOOD_POSITION,
        LS.GOOD_POSITION,
        LS.GOOD_POSITION,
        LS.GOOD_POSITION
      ],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN],
      [LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN, LS.UNKNOWN]
    ]
  ]
])(
  'renders correctly',
  (
    maxAttempts: number,
    wordLength: number,
    words: string[],
    statuses: LS[][]
  ) => {
    render(
      <Grid
        maxAttempts={6}
        wordLength={wordLength}
        words={words}
        statuses={statuses}
      />
    )

    const letterBoxes = screen.getAllByTestId('letter-box')

    expect(letterBoxes).toHaveLength(maxAttempts * wordLength)
    for (let i = 0; i < maxAttempts; i++) {
      for (let j = 0; j < wordLength; j++) {
        const currentLB = letterBoxes[i * wordLength + j]
        expect(currentLB).toHaveAttribute('data-status', `${statuses[i][j]}`)
        expect(currentLB).toHaveTextContent(words[i].charAt(j))
      }
    }
  }
)

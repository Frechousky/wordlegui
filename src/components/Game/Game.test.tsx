/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from '@testing-library/react'
import assert from 'assert'
import { VALUE_BACK_SPACE, VALUE_RETURN } from 'keycode-js'
import { act } from 'react-dom/test-utils'
import { ALPHABET_LETTER_REGEX, LETTER_UNKNOWN } from '../../constants'
import { GameStatus } from '../../persistence'
import Game from './Game'

describe('user presses a key', () => {
  describe('key is an alphabet letter', () => {
    it.each([
      ['a', '', 6, []],
      ['B', '', 7, []],
      ['z', '', 8, []],
      ['a', 'T', 6, []],
      ['a', 'DANSER', 7, []],
      ['a', 'DANSER', 7, ['BATEAUX']],
      [
        'a',
        'DANSER',
        7,
        ['BATEAUX', 'DINDONS', 'PAPAYES', 'SAUCEES', 'LAVERAS']
      ]
    ])(
      'adds character when current attempt is not word length characters long',
      (
        key: string,
        currentAttempt: string,
        wordLength: number,
        previousAttempts: string[]
      ) => {
        assert(ALPHABET_LETTER_REGEX.test(key))
        assert(currentAttempt.length < wordLength)

        render(
          <Game
            initData={{
              currentAttempt: currentAttempt,
              wordLength: wordLength,
              previousAttempts: previousAttempts,
              dateYYYYMMDD: '20231122',
              maxAttempts: 6,
              prevAttemptsPositionStatuses: [],
              status: GameStatus.IN_PROGRESS
            }}
            initSettings={{ wordLength: wordLength, keyboardIdx: 0 }}
          />
        )

        const addedCharacterPosition =
          previousAttempts.length * wordLength + currentAttempt.length

        const letterInputs = screen.getAllByTestId('letter-input')

        expect(letterInputs[addedCharacterPosition]).toHaveValue(LETTER_UNKNOWN)

        fireEvent.keyDown(document, {
          key: key
        })

        expect(letterInputs[addedCharacterPosition]).toHaveValue(
          key.toUpperCase()
        )
      }
    )

    it.each([
      ['R', 'DANSER', 6, []],
      ['B', 'DANSER', 6, []],
      ['c', 'DANSER', 6, ['BATEAU']],
      ['L', 'DANSER', 6, ['BATEAU', 'DINDON', 'PAPAYE', 'SAUCEE', 'LAVERA']],
      ['B', 'DANSERA', 7, []],
      ['c', 'DANSERA', 7, ['BATEAUX']],
      [
        'L',
        'DANSERA',
        7,
        ['BATEAUX', 'DINDONS', 'PAPAYES', 'SAUCEES', 'LAVERAS']
      ]
    ])(
      'does not add character when current attempt is word length characters long',
      (
        key: string,
        currentAttempt: string,
        wordLength: number,
        previousAttempts: string[]
      ) => {
        assert(ALPHABET_LETTER_REGEX.test(key))
        assert(currentAttempt.length === wordLength)

        render(
          <Game
            initData={{
              currentAttempt: currentAttempt,
              wordLength: wordLength,
              previousAttempts: previousAttempts,
              dateYYYYMMDD: '20231122',
              maxAttempts: 6,
              prevAttemptsPositionStatuses: [],
              status: GameStatus.IN_PROGRESS
            }}
            initSettings={{ wordLength: wordLength, keyboardIdx: 0 }}
          />
        )

        const letterInputs = screen.getAllByTestId('letter-input')

        const currentAttemptLastCharacterPosition =
          previousAttempts.length * wordLength + currentAttempt.length - 1

        expect(letterInputs[currentAttemptLastCharacterPosition]).toHaveValue(
          currentAttempt.slice(-1)
        )

        act(() =>
        fireEvent.keyDown(document, {
          key: key
        })
        )

        expect(letterInputs[currentAttemptLastCharacterPosition]).toHaveValue(
          currentAttempt.slice(-1)
        )
      }
    )
  })

  describe('key is backspace', () => {
    it.each([['D'], ['DAN'], ['DANSER']])(
      'removes last character from current attempt when current attempt is not empty',
      (currentAttempt: string) => {
        assert(currentAttempt.length > 0)
        const wordLength = 6
        render(
          <Game
            initData={{
              currentAttempt: currentAttempt,
              wordLength: 6,
              previousAttempts: [],
              dateYYYYMMDD: '20231122',
              maxAttempts: 6,
              prevAttemptsPositionStatuses: [],
              status: GameStatus.IN_PROGRESS
            }}
            initSettings={{ wordLength: wordLength, keyboardIdx: 0 }}
          />
        )

        const currentAttemptLastLetterPosition = currentAttempt.length - 1

        const letterInputs = screen.getAllByTestId('letter-input')

        expect(letterInputs[currentAttemptLastLetterPosition]).toHaveValue(
          currentAttempt.slice(-1)
        )

        act(() =>
        fireEvent.keyDown(document, {
          key: VALUE_BACK_SPACE
        })
        )

        expect(letterInputs[currentAttemptLastLetterPosition]).toHaveValue(
          LETTER_UNKNOWN
        )
      }
    )

    it('does nothing when current attempt is empty', () => {
      const wordLength = 6

      render(
        <Game
          initData={{
            currentAttempt: '',
            wordLength: wordLength,
            previousAttempts: [],
            dateYYYYMMDD: '20231122',
            maxAttempts: 6,
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
          }}
          initSettings={{ wordLength: wordLength, keyboardIdx: 0 }}
        />
      )

      const letterInputs = screen.getAllByTestId('letter-input')

      expect(letterInputs[0]).toHaveValue(LETTER_UNKNOWN)

      act(() =>
      fireEvent.keyDown(document, {
        key: VALUE_BACK_SPACE
      })
      )

      expect(letterInputs[0]).toHaveValue(LETTER_UNKNOWN)
    })
  })

  describe('key is return', () => {
    it.todo('displays guess result when player submits a valid attempt')
    it.todo('notifies player win when he submit the right word')
    it.todo('notifies player loose when he failed all his attempts')
    it.todo('displays error when current attempt is not in whitelist')
    it.todo('displays error when current attempt is not long enough')
    it.todo('displays error when wordle API is not reachable')
  })

  describe('key is anything else', () => {
    it.each('123456789²&é"\'(-è_çà)=~#{[|`\\^@]'.split(''))(
      'does nothing',
      (key: string) => {
        assert(!ALPHABET_LETTER_REGEX.test(key))
        assert(key !== VALUE_BACK_SPACE)
        assert(key !== VALUE_RETURN)

        const wordLength = 6

        render(
          <Game
            initData={{
              currentAttempt: '',
              wordLength: wordLength,
              previousAttempts: [],
              dateYYYYMMDD: '20231122',
              maxAttempts: 6,
              prevAttemptsPositionStatuses: [],
              status: GameStatus.IN_PROGRESS
            }}
            initSettings={{ wordLength: wordLength, keyboardIdx: 0 }}
          />
        )

        const letterInputs = screen.getAllByTestId('letter-input')

        expect(letterInputs[0]).toHaveValue(LETTER_UNKNOWN)

        act(() =>
        fireEvent.keyDown(document, {
          key: key
        })
        )

        expect(letterInputs[0]).toHaveValue(LETTER_UNKNOWN)
      }
    )
  })
})

import assert from "assert"
import { WordleApiCharacterStatus } from "../clients/wordleapi"
import gameReducer from "./gameReducer"
import { CharacterStatus } from "../constants"

const ATTEMPT_RESULT_BAD_POSITION = Array(6).fill(WordleApiCharacterStatus.BAD_POSITION)

describe('gameReducer addAttempt action', () => {
    test.each([
        [undefined, undefined],
        [undefined, []],
        [undefined, ATTEMPT_RESULT_BAD_POSITION],
        ['', undefined],
        ['', []],
        ['', ATTEMPT_RESULT_BAD_POSITION],
        ['AZERTY', undefined],
    ])('throws error if attempt or attemptResult is empty', (attempt: string | undefined, attemptResult: WordleApiCharacterStatus[] | undefined
    ) => {
        const f = () => {
            gameReducer({
                dateYYYYMMDD: '20231115',
                wordLength: 6,
                maxAttempts: 6,
                currentAttempt: '',
                previousAttempts: [],
                characterPositionStatuses: {}
            }, { type: "addAttempt", attempt: attempt, attemptResult: attemptResult })
        }

        expect(f).toThrowError('Missing attempt or attemptResult')
    })

    test.each([
        'AZE',
        'AZERTYUIOP',
    ])('throws error if attempt is not wordLength long', (attempt: string) => {
        const data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: '',
            previousAttempts: [],
            characterPositionStatuses: {}
        }
        assert(attempt.length !== data.wordLength)

        const f = () => { gameReducer(data, { type: "addAttempt", attempt: attempt, attemptResult: ATTEMPT_RESULT_BAD_POSITION }) }

        expect(f).toThrowError('Invalid attempt')
    })

    test.each([
        [[WordleApiCharacterStatus.BAD_POSITION, WordleApiCharacterStatus.BAD_POSITION]],
        [[
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION
        ]],
    ])('throws error if attemptResult is not wordLength long', (attemptResult: WordleApiCharacterStatus[]) => {
        const data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: '',
            previousAttempts: [],
            characterPositionStatuses: {}
        }
        assert(attemptResult.length !== data.wordLength)

        const f = () => { gameReducer(data, { type: "addAttempt", attempt: 'AZERTY', attemptResult: attemptResult }) }

        expect(f).toThrowError('Invalid attemptResult')
    })

    test('adds attempt correctly when there is no previous attempts', () => {
        const attempt = 'AZERTY'
        const attemptResult = [
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.GOOD_POSITION
        ]
        let data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: attempt,
            previousAttempts: [],
            characterPositionStatuses: {}
        }

        const out = gameReducer(data, { type: 'addAttempt', attempt: attempt, attemptResult: attemptResult })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual('')
        expect(out.previousAttempts).toEqual([attempt])
        expect(out.characterPositionStatuses).toEqual({
            'A': {
                0: CharacterStatus.GOOD_POSITION
            },
            'Z': {
                1: CharacterStatus.NOT_PRESENT
            },
            'E': {
                2: CharacterStatus.NOT_PRESENT
            },
            'R': {
                3: CharacterStatus.BAD_POSITION
            },
            'T': {
                4: CharacterStatus.NOT_PRESENT
            },
            'Y': {
                5: CharacterStatus.GOOD_POSITION
            },
        })
    })

    test('adds attempt correctly when there is previous attempts', () => {
        const attempt = 'BATEAU'
        const attemptResult = [
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.BAD_POSITION
        ]
        let data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: attempt,
            previousAttempts: ['AZERTY'],
            characterPositionStatuses: {
                'A': {
                    0: CharacterStatus.GOOD_POSITION
                },
                'Z': {
                    1: CharacterStatus.NOT_PRESENT
                },
                'E': {
                    2: CharacterStatus.NOT_PRESENT
                },
                'R': {
                    3: CharacterStatus.BAD_POSITION
                },
                'T': {
                    4: CharacterStatus.NOT_PRESENT
                },
                'Y': {
                    5: CharacterStatus.GOOD_POSITION
                },
            }
        }

        const out = gameReducer(data, { type: 'addAttempt', attempt: attempt, attemptResult: attemptResult })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual('')
        expect(out.previousAttempts).toEqual([...data.previousAttempts, data.currentAttempt])
        expect(out.characterPositionStatuses).toEqual({
            'A': {
                0: CharacterStatus.GOOD_POSITION,
                1: WordleApiCharacterStatus.BAD_POSITION,
                4: WordleApiCharacterStatus.NOT_PRESENT,
            },
            'B': {
                0: WordleApiCharacterStatus.BAD_POSITION,
            },
            'Z': {
                1: CharacterStatus.NOT_PRESENT,
            },
            'E': {
                2: CharacterStatus.NOT_PRESENT,
                3: CharacterStatus.NOT_PRESENT,
            },
            'R': {
                3: CharacterStatus.BAD_POSITION,
            },
            'T': {
                2: CharacterStatus.NOT_PRESENT,
                4: CharacterStatus.NOT_PRESENT,
            },
            'U': {
                5: CharacterStatus.BAD_POSITION,
            },
            'Y': {
                5: CharacterStatus.GOOD_POSITION,
            },
        })
    })
})

describe('gameReducer addCharacter action', () => {
    test('throws error is character is empty', () => {
        const game = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: '',
            previousAttempts: [],
            characterPositionStatuses: {}
        }

        let f = () => gameReducer(game, { type: 'addCharacter' })
        let g = () => gameReducer(game, { type: 'addCharacter', character: '' })
        let h = () => gameReducer(game, { type: 'addCharacter', character: undefined })

        expect(f).toThrowError('Missing character')
        expect(g).toThrowError('Missing character')
        expect(h).toThrowError('Missing character')
    })

    test.each([
        ['AZERTY', 'A', 6],
        ['BATEAU', 'a', 6],
        ['AZERTYU', 'A', 7],
        ['BATEAUX', 'a', 7],
        ['AZERTYUO', 'A', 8],
        ['ALBATROS', 'a', 8],
    ])('does not add character is current attempt is word length long', (currentAttempt: string, character: string, wordLength: number) => {
        const data = {
            dateYYYYMMDD: '20231115',
            wordLength: wordLength,
            maxAttempts: 6,
            currentAttempt: currentAttempt,
            previousAttempts: [],
            characterPositionStatuses: {}
        }
        assert(data.currentAttempt.length === data.wordLength)


        const out = gameReducer(data, { type: 'addCharacter', character: character })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual(out.currentAttempt)
        expect(out.previousAttempts).toEqual(data.previousAttempts)
        expect(out.characterPositionStatuses).toEqual(data.characterPositionStatuses)
    })

    test.each([
        ['', 'A', 'A'],
        ['', 'a', 'A'],
        ['AZE', 'R', 'AZER'],
        ['AZE', 'r', 'AZER'],
    ])('adds character correctly', (currentAttempt: string, character: string, expected: string) => {
        const data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: currentAttempt,
            previousAttempts: [],
            characterPositionStatuses: {}
        }

        const out = gameReducer(data, { type: 'addCharacter', character: character })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual(expected)
        expect(out.previousAttempts).toEqual(data.previousAttempts)
        expect(out.characterPositionStatuses).toEqual(data.characterPositionStatuses)
    })
})

describe('gameReducer removeCharacter action', () => {
    test.each([
        ['AZERTY', 'AZERT'],
        ['AZERT', 'AZER'],
        ['A', ''],
        ['', ''],
    ])('removes character correctly', (currentAttempt: string, expected: string) => {
        const data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: currentAttempt,
            previousAttempts: [],
            characterPositionStatuses: {}
        }
        const out = gameReducer(data, { type: 'removeCharacter' })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual(data.currentAttempt.slice(0, -1))
        expect(out.previousAttempts).toEqual(data.previousAttempts)
        expect(out.characterPositionStatuses).toEqual(data.characterPositionStatuses)
    })
})
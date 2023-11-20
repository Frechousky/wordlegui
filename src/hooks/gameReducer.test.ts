import assert from "assert"
import { WordleApiCharacterStatus } from "../clients/wordleapi"
import gameReducer from "./gameReducer"
import { CharacterStatus } from "../constants"
import { GameStatus } from "../persistence"

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
                prevAttemptsPositionStatuses: [],
                status: GameStatus.IN_PROGRESS
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
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
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
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
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
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
        }

        const out = gameReducer(data, { type: 'addAttempt', attempt: attempt, attemptResult: attemptResult })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual('')
        expect(out.previousAttempts).toEqual([attempt])
        expect(out.prevAttemptsPositionStatuses).toEqual([
            [
                CharacterStatus.GOOD_POSITION,
                CharacterStatus.NOT_PRESENT,
                CharacterStatus.NOT_PRESENT,
                CharacterStatus.BAD_POSITION,
                CharacterStatus.NOT_PRESENT,
                CharacterStatus.GOOD_POSITION
            ]])
        expect(out.status).toEqual(data.status)
    })

    test('adds attempt correctly when there are previous attempts', () => {
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
            prevAttemptsPositionStatuses: [
                [
                    CharacterStatus.GOOD_POSITION,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.GOOD_POSITION
                ]
            ],
            status: GameStatus.IN_PROGRESS
        }

        const out = gameReducer(data, { type: 'addAttempt', attempt: attempt, attemptResult: attemptResult })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual('')
        expect(out.previousAttempts).toEqual([...data.previousAttempts, data.currentAttempt])
        expect(out.prevAttemptsPositionStatuses).toEqual([...data.prevAttemptsPositionStatuses,
        [
            CharacterStatus.BAD_POSITION,
            CharacterStatus.BAD_POSITION,
            CharacterStatus.NOT_PRESENT,
            CharacterStatus.NOT_PRESENT,
            CharacterStatus.NOT_PRESENT,
            CharacterStatus.BAD_POSITION
        ]
        ])
        expect(out.status).toEqual(data.status)
    })

    test('updates game status to WIN when attempt is correct', () => {
        const attempt = 'BATEAU'
        const attemptResult = [
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION
        ]
        let data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: attempt,
            previousAttempts: ['AZERTY'],
            prevAttemptsPositionStatuses: [
                [
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.NOT_PRESENT
                ]
            ],
            status: GameStatus.IN_PROGRESS
        }

        const out = gameReducer(data, { type: 'addAttempt', attempt: attempt, attemptResult: attemptResult })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual('')
        expect(out.previousAttempts).toEqual([...data.previousAttempts, data.currentAttempt])
        expect(out.prevAttemptsPositionStatuses).toEqual([...data.prevAttemptsPositionStatuses,
        [
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION,
            WordleApiCharacterStatus.GOOD_POSITION
        ]
        ])
        expect(out.status).toEqual(GameStatus.WIN)
    })

    test('updates game status to LOOSE when all attempts were played', () => {
        const attempt = 'FAYOTS'
        const attemptResult = [
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION,
            WordleApiCharacterStatus.BAD_POSITION
        ]
        let data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: attempt,
            previousAttempts: ['AZERTY', 'BATEAU', 'CABLES', 'DIURNE', 'EMACIA'],
            prevAttemptsPositionStatuses: [
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
                , [
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION
                ], [
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION
                ], [
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION,
                    CharacterStatus.BAD_POSITION
                ]
            ],
            status: GameStatus.IN_PROGRESS
        }

        const out = gameReducer(data, { type: 'addAttempt', attempt: attempt, attemptResult: attemptResult })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual('')
        expect(out.previousAttempts).toEqual([...data.previousAttempts, data.currentAttempt])
        expect(out.prevAttemptsPositionStatuses).toEqual([...data.prevAttemptsPositionStatuses,
        [
            CharacterStatus.BAD_POSITION,
            CharacterStatus.BAD_POSITION,
            CharacterStatus.BAD_POSITION,
            CharacterStatus.BAD_POSITION,
            CharacterStatus.BAD_POSITION,
            CharacterStatus.BAD_POSITION
        ]
        ])
        expect(out.status).toEqual(GameStatus.LOOSE)
    })
})

describe('gameReducer addCharacter action', () => {
    test('throws error if character is empty', () => {
        const game = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: '',
            previousAttempts: [],
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
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
    ])('does not add character if current attempt is word length long', (currentAttempt: string, character: string, wordLength: number) => {
        const data = {
            dateYYYYMMDD: '20231115',
            wordLength: wordLength,
            maxAttempts: 6,
            currentAttempt: currentAttempt,
            previousAttempts: [],
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
        }
        assert(data.currentAttempt.length === data.wordLength)


        const out = gameReducer(data, { type: 'addCharacter', character: character })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual(out.currentAttempt)
        expect(out.previousAttempts).toEqual(data.previousAttempts)
        expect(out.prevAttemptsPositionStatuses).toEqual(data.prevAttemptsPositionStatuses)
        expect(out.status).toEqual(data.status)
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
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
        }

        const out = gameReducer(data, { type: 'addCharacter', character: character })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual(expected)
        expect(out.previousAttempts).toEqual(data.previousAttempts)
        expect(out.prevAttemptsPositionStatuses).toEqual(data.prevAttemptsPositionStatuses)
        expect(out.status).toEqual(data.status)
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
            prevAttemptsPositionStatuses: [],
            status: GameStatus.IN_PROGRESS
        }
        const out = gameReducer(data, { type: 'removeCharacter' })

        expect(out.dateYYYYMMDD).toEqual(data.dateYYYYMMDD)
        expect(out.wordLength).toEqual(data.wordLength)
        expect(out.maxAttempts).toEqual(data.maxAttempts)
        expect(out.currentAttempt).toEqual(data.currentAttempt.slice(0, -1))
        expect(out.previousAttempts).toEqual(data.previousAttempts)
        expect(out.prevAttemptsPositionStatuses).toEqual(data.prevAttemptsPositionStatuses)
        expect(out.status).toEqual(data.status)
    })
})
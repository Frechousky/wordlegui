import assert from "assert"
import { WordleApiCharacterStatus } from "../clients/wordleapi"
import { CharacterStatus } from "../constants"
import { GameStatus } from "../persistence"
import gameReducer from "./gameReducer"

const ATTEMPT_RESULT_BAD_POSITION = Array(6).fill(WordleApiCharacterStatus.MISPLACED)

describe('gameReducer addAttempt action', () => {
    it.each([
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

    it.each([
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

    it.each([
        [[WordleApiCharacterStatus.MISPLACED, WordleApiCharacterStatus.MISPLACED]],
        [[
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED
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

    it('adds attempt correctly when there is no previous attempts', () => {
        const attempt = 'AZERTY'
        const attemptResult = [
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.WELL_PLACED
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
                CharacterStatus.WELL_PLACED,
                CharacterStatus.NOT_PRESENT,
                CharacterStatus.NOT_PRESENT,
                CharacterStatus.MISPLACED,
                CharacterStatus.NOT_PRESENT,
                CharacterStatus.WELL_PLACED
            ]])
        expect(out.status).toEqual(data.status)
    })

    it('adds attempt correctly when there are previous attempts', () => {
        const attempt = 'BATEAU'
        const attemptResult = [
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.NOT_PRESENT,
            WordleApiCharacterStatus.MISPLACED
        ]
        let data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: attempt,
            previousAttempts: ['AZERTY'],
            prevAttemptsPositionStatuses: [
                [
                    CharacterStatus.WELL_PLACED,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.WELL_PLACED
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
            CharacterStatus.MISPLACED,
            CharacterStatus.MISPLACED,
            CharacterStatus.NOT_PRESENT,
            CharacterStatus.NOT_PRESENT,
            CharacterStatus.NOT_PRESENT,
            CharacterStatus.MISPLACED
        ]
        ])
        expect(out.status).toEqual(data.status)
    })

    it('updates game status to WIN when attempt is correct', () => {
        const attempt = 'BATEAU'
        const attemptResult = [
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED
        ]
        let data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: attempt,
            previousAttempts: ['AZERTY'],
            prevAttemptsPositionStatuses: [
                [
                    CharacterStatus.MISPLACED,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.NOT_PRESENT,
                    CharacterStatus.MISPLACED,
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
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED,
            WordleApiCharacterStatus.WELL_PLACED
        ]
        ])
        expect(out.status).toEqual(GameStatus.WIN)
    })

    it('updates game status to LOOSE when all attempts were played', () => {
        const attempt = 'FAYOTS'
        const attemptResult = [
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED,
            WordleApiCharacterStatus.MISPLACED
        ]
        let data = {
            dateYYYYMMDD: '20231115',
            wordLength: 6,
            maxAttempts: 6,
            currentAttempt: attempt,
            previousAttempts: ['AZERTY', 'BATEAU', 'CABLES', 'DIURNE', 'EMACIA'],
            prevAttemptsPositionStatuses: [
                [
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED
                ],
                [
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED
                ]
                , [
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED
                ], [
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED
                ], [
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED,
                    CharacterStatus.MISPLACED
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
            CharacterStatus.MISPLACED,
            CharacterStatus.MISPLACED,
            CharacterStatus.MISPLACED,
            CharacterStatus.MISPLACED,
            CharacterStatus.MISPLACED,
            CharacterStatus.MISPLACED
        ]
        ])
        expect(out.status).toEqual(GameStatus.LOOSE)
    })
})

describe('gameReducer addCharacter action', () => {
    it('throws error if character is empty', () => {
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

    it.each([
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

    it.each([
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
    it.each([
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
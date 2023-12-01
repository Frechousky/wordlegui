import { WordleApiCharacterStatus } from "../clients/wordleapi"
import { WORD_LENGTHS } from "../constants"
import { GameData, GameStatus, loadGame, saveGame } from "../persistence"
import { wordleApiCharacterStatusToCharacterStatus } from "../utils"

type ActionType = 'addAttempt' | 'addCharacter' | 'removeCharacter' | 'updateDate' | 'updateWordLength'

type GameReducerAction = {
    type: ActionType,
    character?: string
    attempt?: string
    attemptResult?: WordleApiCharacterStatus[]
    wordLength?: number
    dateYYYYMMDD?: string
}

function gameReducer(game: GameData, action: GameReducerAction) {
    switch (action.type) {
        case "addAttempt": {
            return addAttempt(action, game)
        }
        case 'addCharacter': {
            return addCharacter(action, game)
        }
        case 'removeCharacter': {
            return removeCharacter(game)
        }
        case 'updateDate': {
            return updateDate(action, game)
        }
        case 'updateWordLength': {
            return updateWordLength(action, game)
        }
    }
}

function updateWordLength(action: GameReducerAction, game: GameData) {
    if (action.wordLength === undefined) {
        throw Error('Missing wordLength')
    }
    if (!WORD_LENGTHS.includes(action.wordLength)) {
        throw Error(`Invalid wordLength (${action.wordLength})`)
    }
    return loadGame(action.wordLength, game.dateYYYYMMDD)
}

function updateDate(action: GameReducerAction, game: GameData) {
    if (!action.dateYYYYMMDD) {
        throw Error('Missing dateYYYMMDD')
    }
    return loadGame(game.wordLength, action.dateYYYYMMDD)
}

function removeCharacter(game: GameData) {
    const newGame = { ...game }
    newGame.currentAttempt = newGame.currentAttempt.slice(0, -1)
    return newGame
}

function addCharacter(action: GameReducerAction, game: GameData) {
    if (!action.character) {
        throw Error('Missing character')
    }
    const newGame = { ...game }
    if (game.currentAttempt.length < game.wordLength) {
        newGame.currentAttempt += action.character.toUpperCase()
    }
    return newGame
}

function addAttempt(action: GameReducerAction, game: GameData) {
    if (!action.attempt || !action.attemptResult) {
        throw Error('Missing attempt or attemptResult')
    }
    else if (action.attempt.length !== game.wordLength) {
        throw Error('Invalid attempt')
    }
    else if (action.attemptResult.length !== game.wordLength) {
        throw Error('Invalid attemptResult')
    }
    const newGame = { ...game }
    newGame.previousAttempts = [...newGame.previousAttempts, action.attempt]
    newGame.prevAttemptsPositionStatuses = [...newGame.prevAttemptsPositionStatuses, action.attemptResult.map(wordleApiCharacterStatusToCharacterStatus)]
    newGame.currentAttempt = ''
    if (action.attemptResult.every(v => v === WordleApiCharacterStatus.WELL_PLACED)) {
        newGame.status = GameStatus.WIN
    } else if (newGame.previousAttempts.length === newGame.maxAttempts) {
        newGame.status = GameStatus.LOOSE
    }
    saveGame(newGame)
    return newGame
}

export function buildAddAttemptAction(attempt: string, attemptResult: WordleApiCharacterStatus[]): GameReducerAction {
    return {
        type: "addAttempt",
        attempt: attempt,
        attemptResult: attemptResult
    }
}

export function buildAddCharacterAction(character: string): GameReducerAction {
    return {
        type: "addCharacter",
        character: character
    }
}

export function buildRemoveCharacterAction(): GameReducerAction {
    return {
        type: "removeCharacter",
    }
}

export function buildUpdateDateAction(dateYYYYMMDD: string): GameReducerAction {
    return {
        type: "updateDate",
        dateYYYYMMDD: dateYYYYMMDD
    }
}

export function buildUpdateWordLengthAction(wordLength: number): GameReducerAction {
    return {
        type: "updateWordLength",
        wordLength: wordLength
    }
}

export default gameReducer
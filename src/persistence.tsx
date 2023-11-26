import {
  CharacterStatus,
  MAX_ATTEMPTS_BY_WORDLENGTH,
  WORD_LENGTHS
} from './constants'

export enum GameStatus {
  IN_PROGRESS,
  WIN,
  LOOSE
}

export type GameData = {
  dateYYYYMMDD: string
  wordLength: number
  maxAttempts: number
  currentAttempt: string
  previousAttempts: string[]
  prevAttemptsPositionStatuses: CharacterStatus[][]
  status: GameStatus
}

export type Settings = {
  keyboardIdx: number
  wordLength: number
}

const DEFAULT_SETTINGS: Settings = {
  keyboardIdx: 0,
  wordLength: WORD_LENGTHS[0]
}

export function loadGames (): GameData[] {
  const gamesJson = localStorage.getItem('games')
  if (gamesJson == null) {
    return []
  }
  return JSON.parse(gamesJson) as GameData[]
}

export function loadGame (wordLength: number, dateYYYMMDD: string): GameData {
  const games = loadGames()
  const game = games.find(
    v => v.wordLength === wordLength && v.dateYYYYMMDD === dateYYYMMDD
  )
  return game
    ? game
    : {
        dateYYYYMMDD: dateYYYMMDD,
        wordLength: wordLength,
        maxAttempts: MAX_ATTEMPTS_BY_WORDLENGTH[wordLength],
        currentAttempt: '',
        previousAttempts: [],
        prevAttemptsPositionStatuses: [],
        status: GameStatus.IN_PROGRESS
      }
}

export function saveGame (game: GameData) {
  const loadedGames = loadGames() // load all games to keep games history
  const loadedGameIdx = loadedGames.findIndex(
    v =>
      v.dateYYYYMMDD === game.dateYYYYMMDD && v.wordLength === game.wordLength
  )
  if (loadedGameIdx === -1) {
    loadedGames.push(game) // this a new game
  } else {
    loadedGames[loadedGameIdx] = game // game has been already saved, updates its data
  }
  const gamesJson = JSON.stringify(loadedGames)
  localStorage.setItem('games', gamesJson)
}

export function loadSettings (): Settings {
  const settingsJson = localStorage.getItem('settings')
  if (settingsJson == null) {
    return DEFAULT_SETTINGS
  }
  const settings = JSON.parse(settingsJson) as Settings
  return { ...DEFAULT_SETTINGS, ...settings }
}

export function saveSettings (settings: Settings) {
  const settingsJson = JSON.stringify({ ...DEFAULT_SETTINGS, ...settings })
  localStorage.setItem('settings', settingsJson)
}

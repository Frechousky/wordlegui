import { WordleApiCharacterStatus } from './clients/wordleapi'
import { CharacterStatus } from './constants'
import {
  getTodayYYYYMMDD,
  wordleApiCharacterStatusToCharacterStatus
} from './utils'

describe('wordleApiCharacterStatusToCharacterStatus', () => {
  it.each([
    [WordleApiCharacterStatus.MISPLACED, CharacterStatus.MISPLACED],
    [WordleApiCharacterStatus.WELL_PLACED, CharacterStatus.WELL_PLACED],
    [WordleApiCharacterStatus.NOT_PRESENT, CharacterStatus.NOT_PRESENT]
  ])(
    'converts correctly',
    (apiStatus: WordleApiCharacterStatus, expected: CharacterStatus) => {
      expect(wordleApiCharacterStatusToCharacterStatus(apiStatus)).toBe(
        expected
      )
    }
  )
})

describe('getTodayYYYYMMDD', () => {
  it.each([
    ['2023-11-14T00:00:00Z', '20231114'],
    ['2023-11-14T12:00:00Z', '20231114'],
    ['2023-11-14T23:59:59Z', '20231114']
  ])(
    'returns a date in "YYYYMMDD" format at UTC time',
    (mockDateString: string, expected: string) => {
      jest.useFakeTimers().setSystemTime(new Date(mockDateString))

      const result = getTodayYYYYMMDD()

      expect(result).toBe(expected)
    }
  )
})

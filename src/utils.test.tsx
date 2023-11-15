import { WordleApiCharacterStatus } from './clients/wordleapi'
import { CharacterStatus } from './constants'
import {
  getTodayYYYYMMDD,
  wordleApiCharacterStatusToCharacterStatus
} from './utils'

describe('wordleApiCharacterStatusToCharacterStatus', () => {
  test.each([
    [WordleApiCharacterStatus.BAD_POSITION, CharacterStatus.BAD_POSITION],
    [WordleApiCharacterStatus.GOOD_POSITION, CharacterStatus.GOOD_POSITION],
    [WordleApiCharacterStatus.NOT_PRESENT, CharacterStatus.NOT_PRESENT]
  ])(
    'conversion is correct',
    (apiStatus: WordleApiCharacterStatus, expected: CharacterStatus) => {
      expect(wordleApiCharacterStatusToCharacterStatus(apiStatus)).toBe(
        expected
      )
    }
  )
})

describe('getTodayYYYYMMDD', () => {
  test.each([
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

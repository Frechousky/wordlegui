export enum CharacterStatus {
    GOOD_POSITION = 0,
    BAD_POSITION = 1,
    NOT_PRESENT = 2,
    UNKNOWN = 3
}

export type Keyboard = {
    name: string
    keys: string[][]
}

export const GAME_TITLE = 'Wordle'

export const LETTER_UNKNOWN = '_'

export const KEY_BACKSPACE = '0'
export const KEY_RETURN = '1'
export const KEY_EMPTY = '2'

export const KEYBOARDS: Keyboard[] = [
    { name: 'AZERTY', keys: ['AZERTYUIOP'.split(''), 'QSDFGHJKLM'.split(''), `WXCVBN${KEY_EMPTY}${KEY_EMPTY}${KEY_BACKSPACE}${KEY_RETURN}`.split('')], },
    { name: 'QWERTY', keys: [`QWERTYUIOP`.split(''), `ASDFGHJKL${KEY_EMPTY}`.split(''), `ZXCVBNM${KEY_EMPTY}${KEY_BACKSPACE}${KEY_RETURN}`.split('')], },
    { name: 'BEPO', keys: [`BEPOVDLJZW`.split(''), `AUICTSRNM${KEY_EMPTY}`.split(''), `YXKQGHF${KEY_EMPTY}${KEY_BACKSPACE}${KEY_RETURN}`.split('')], }
]

export const WORD_LENGTHS = [6, 7, 8]

export const MAX_ATTEMPTS_BY_WORDLENGTH: { [key: number]: number } = {
    6: 6,
    7: 6,
    8: 7
}

export const ALPHABET_LETTER_REGEX = /^[a-zA-Z]$/

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

export const LETTER_UNKNOWN = '_'

export const KEY_BACKSPACE = '0'
export const KEY_RETURN = '1'

export const KEYBOARDS: Keyboard[] = [
    { name: 'AZERTY', keys: [`AZERTYUIOP${KEY_BACKSPACE}`.split(''), `QSDFGHJKLM${KEY_RETURN}`.split(''), 'WXCVBN'.split('')], },
    { name: 'QWERTY', keys: [`QWERTYUIOP${KEY_BACKSPACE}`.split(''), `ASDFGHJKL${KEY_RETURN}`.split(''), 'ZXCVBNM'.split('')], },
    { name: 'BEPO', keys: [`BEPOVDLJZW${KEY_BACKSPACE}`.split(''), `AUICTSRNM${KEY_RETURN}`.split(''), 'YXKQGHF'.split('')], }
]

export const WORD_LENGTHS = [6, 7, 8]

export const MAX_ATTEMPTS_BY_WORDLENGTH: { [key: number]: number } = {
    6: 6,
    7: 6,
    8: 7
}

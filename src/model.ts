export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export const LETTER_UNKNOWN = '_'

export type LetterBoxType = Letter | '_'

export const KEY_BACKSPACE = '0'
export const KEY_RETURN = '1'


export type KeyboardKeyType = Letter | '0' | '1'

export enum LetterStatus {
    GOOD_POSITION = 0,
    BAD_POSITION = 1,
    NOT_PRESENT = 2,
    UNKNOWN = 3
}

export const KEYBOARD_AZERTY = [`AZERTYUIOP${KEY_BACKSPACE}`.split(''), `QSDFGHJKLM${KEY_RETURN}`.split(''), 'WXCVBN'.split('')] as KeyboardKeyType[][]

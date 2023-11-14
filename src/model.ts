export const LETTER_UNKNOWN = '_'

export const KEY_BACKSPACE = '0'
export const KEY_RETURN = '1'


export enum LetterStatus {
    GOOD_POSITION = 0,
    BAD_POSITION = 1,
    NOT_PRESENT = 2,
    UNKNOWN = 3
}

export const KEYBOARD_AZERTY = [`AZERTYUIOP${KEY_BACKSPACE}`.split(''), `QSDFGHJKLM${KEY_RETURN}`.split(''), 'WXCVBN'.split('')]

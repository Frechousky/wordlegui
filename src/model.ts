export const BACKSPACE_KEY = '0'
export const RETURN_KEY = '1'

export enum LetterStatus {
    GOOD_POSITION,
    BAD_POSITION,
    NOT_PRESENT,
    UNKNOWN
}
export const KEYBOARD_ROW_DELIM = '\n'
export const KEYBOARD_AZERTY = `azertyuiop${BACKSPACE_KEY}${KEYBOARD_ROW_DELIM}qsdfghjklm${RETURN_KEY}${KEYBOARD_ROW_DELIM}wxcvbn`

export const STATUS_GOOD_POSITION = 'good-position'
export const STATUS_BAD_POSITION = 'bad-position'
export const STATUS_NOT_PRESENT = 'not-present'
export const STATUS_UNKNOWN = 'unknown'

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
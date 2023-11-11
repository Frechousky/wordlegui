import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BACKSPACE_KEY,
  KEYBOARD_AZERTY,
  KEYBOARD_ROW_DELIM,
  RETURN_KEY
} from '../../model'
import Keyboard from './Keyboard'

test.each(new Array(KEYBOARD_AZERTY))(
  'keyboard renders correctly',
  (keys: string) => {
    render(<Keyboard keys={keys} />)

    const keyboardKeys = screen.getAllByRole('button')

    const keysArray = keys.replaceAll(KEYBOARD_ROW_DELIM, '').split('')
    expect(keyboardKeys).toHaveLength(keysArray.length)

    for (let i = 0; i < keysArray.length; i++) {
      const key = keysArray[i]
      if (key === BACKSPACE_KEY || key === RETURN_KEY) {
        continue
      }

      const kk = screen.getByText(new RegExp(key, 'i'))

      expect(kk).toBeInTheDocument()
    }
  }
)

test('calls correct handler when clicking letter key', () => {
  const mockHandleOnLetterClick = jest.fn(() => {})
  const mockHandleOnBackspaceClick = jest.fn(() => {})
  const mockHandleOnReturnClick = jest.fn(() => {})

  render(
    <Keyboard
      keys={KEYBOARD_AZERTY}
      handleOnLetterClickWrapper={key => mockHandleOnLetterClick}
      handleOnBackspaceClick={mockHandleOnBackspaceClick}
      handleOnReturnClick={mockHandleOnReturnClick}
    />
  )

  userEvent.click(screen.getByTestId('keyboard-key-a'))

  expect(mockHandleOnLetterClick).toBeCalledTimes(1)
  expect(mockHandleOnBackspaceClick).toBeCalledTimes(0)
  expect(mockHandleOnReturnClick).toBeCalledTimes(0)
})

test('calls correct handler when clicking backspace key', () => {
  const mockHandleOnLetterClick = jest.fn(() => {})
  const mockHandleOnBackspaceClick = jest.fn(() => {})
  const mockHandleOnReturnClick = jest.fn(() => {})

  render(
    <Keyboard
      keys={KEYBOARD_AZERTY}
      handleOnLetterClickWrapper={key => mockHandleOnLetterClick}
      handleOnBackspaceClick={mockHandleOnBackspaceClick}
      handleOnReturnClick={mockHandleOnReturnClick}
    />
  )

  userEvent.click(screen.getByTestId(`keyboard-key-${BACKSPACE_KEY}`))

  expect(mockHandleOnLetterClick).toBeCalledTimes(0)
  expect(mockHandleOnBackspaceClick).toBeCalledTimes(1)
  expect(mockHandleOnReturnClick).toBeCalledTimes(0)
})

test('calls correct handler when clicking return key', () => {
  const mockHandleOnLetterClick = jest.fn(() => {})
  const mockHandleOnBackspaceClick = jest.fn(() => {})
  const mockHandleOnReturnClick = jest.fn(() => {})

  render(
    <Keyboard
      keys={KEYBOARD_AZERTY}
      handleOnLetterClickWrapper={key => mockHandleOnLetterClick}
      handleOnBackspaceClick={mockHandleOnBackspaceClick}
      handleOnReturnClick={mockHandleOnReturnClick}
    />
  )

  userEvent.click(screen.getByTestId(`keyboard-key-${RETURN_KEY}`))

  expect(mockHandleOnLetterClick).toBeCalledTimes(0)
  expect(mockHandleOnBackspaceClick).toBeCalledTimes(0)
  expect(mockHandleOnReturnClick).toBeCalledTimes(1)
})

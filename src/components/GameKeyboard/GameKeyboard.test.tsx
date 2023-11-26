/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import {
  KEYBOARDS,
  KEY_BACKSPACE,
  KEY_EMPTY,
  KEY_RETURN,
  Keyboard
} from '../../constants'
import GameKeyboard from './GameKeyboard'

it.each([KEYBOARDS])('renders correctly', (keyboard: Keyboard) => {
  render(<GameKeyboard keyboard={keyboard} />)

  keyboard.keys.forEach(row => {
    row.forEach(key => {
      if (key === KEY_BACKSPACE || key === KEY_RETURN || key === KEY_EMPTY) {
        return
      }
      const kk = screen.getByText(new RegExp(key, 'i'))

      expect(kk).toBeInTheDocument()
    })
  })
})

it.each([KEYBOARDS])(
  'calls correct handler when clicking character key',
  (keyboard: Keyboard) => {
    const mockHandleOnCharacterClick = jest.fn(() => {})
    const mockHandleOnBackspaceClick = jest.fn(() => {})
    const mockHandleOnReturnClick = jest.fn(() => {})

    render(
      <GameKeyboard
        keyboard={keyboard}
        handleOnCharacterClickWrapper={key => mockHandleOnCharacterClick}
        handleOnBackspaceClick={mockHandleOnBackspaceClick}
        handleOnReturnClick={mockHandleOnReturnClick}
      />
    )

    act(() => userEvent.click(screen.getByTestId('game-keyboard-key-A')))

    expect(mockHandleOnCharacterClick).toBeCalledTimes(1)
    expect(mockHandleOnBackspaceClick).toBeCalledTimes(0)
    expect(mockHandleOnReturnClick).toBeCalledTimes(0)
  }
)

it.each([KEYBOARDS])(
  'calls correct handler when clicking backspace key',
  (keyboard: Keyboard) => {
    const mockHandleOnCharacterClick = jest.fn(() => {})
    const mockHandleOnBackspaceClick = jest.fn(() => {})
    const mockHandleOnReturnClick = jest.fn(() => {})

    render(
      <GameKeyboard
        keyboard={keyboard}
        handleOnCharacterClickWrapper={key => mockHandleOnCharacterClick}
        handleOnBackspaceClick={mockHandleOnBackspaceClick}
        handleOnReturnClick={mockHandleOnReturnClick}
      />
    )

    act(() =>
      userEvent.click(screen.getByTestId(`game-keyboard-key-${KEY_BACKSPACE}`))
    )

    expect(mockHandleOnCharacterClick).toBeCalledTimes(0)
    expect(mockHandleOnBackspaceClick).toBeCalledTimes(1)
    expect(mockHandleOnReturnClick).toBeCalledTimes(0)
  }
)

it.each([KEYBOARDS])(
  'calls correct handler when clicking return key',
  (keyboard: Keyboard) => {
    const mockHandleOnCharacterClick = jest.fn(() => {})
    const mockHandleOnBackspaceClick = jest.fn(() => {})
    const mockHandleOnReturnClick = jest.fn(() => {})

    render(
      <GameKeyboard
        keyboard={keyboard}
        handleOnCharacterClickWrapper={key => mockHandleOnCharacterClick}
        handleOnBackspaceClick={mockHandleOnBackspaceClick}
        handleOnReturnClick={mockHandleOnReturnClick}
      />
    )

    act(() =>
      userEvent.click(screen.getByTestId(`game-keyboard-key-${KEY_RETURN}`))
    )

    expect(mockHandleOnCharacterClick).toBeCalledTimes(0)
    expect(mockHandleOnBackspaceClick).toBeCalledTimes(0)
    expect(mockHandleOnReturnClick).toBeCalledTimes(1)
  }
)

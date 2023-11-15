import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KEY_BACKSPACE, KEYBOARDS, KEY_RETURN } from '../../constants'
import GameKeyboard from './GameKeyboard'
import { Keyboard } from '../../constants'

test.each([KEYBOARDS])('keyboard renders correctly', (keyboard: Keyboard) => {
  render(<GameKeyboard keyboard={keyboard} />)

  keyboard.keys.forEach(row => {
    row.forEach(key => {
      if (key === KEY_BACKSPACE || key === KEY_RETURN) {
        return
      }
      const kk = screen.getByText(new RegExp(key, 'i'))

      expect(kk).toBeInTheDocument()
    })
  })
})

test.each([KEYBOARDS])(
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

    userEvent.click(screen.getByTestId('game-keyboard-key-A'))

    expect(mockHandleOnCharacterClick).toBeCalledTimes(1)
    expect(mockHandleOnBackspaceClick).toBeCalledTimes(0)
    expect(mockHandleOnReturnClick).toBeCalledTimes(0)
  }
)

test.each([KEYBOARDS])(
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

    userEvent.click(screen.getByTestId(`game-keyboard-key-${KEY_BACKSPACE}`))

    expect(mockHandleOnCharacterClick).toBeCalledTimes(0)
    expect(mockHandleOnBackspaceClick).toBeCalledTimes(1)
    expect(mockHandleOnReturnClick).toBeCalledTimes(0)
  }
)

test.each([KEYBOARDS])(
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

    userEvent.click(screen.getByTestId(`game-keyboard-key-${KEY_RETURN}`))

    expect(mockHandleOnCharacterClick).toBeCalledTimes(0)
    expect(mockHandleOnBackspaceClick).toBeCalledTimes(0)
    expect(mockHandleOnReturnClick).toBeCalledTimes(1)
  }
)
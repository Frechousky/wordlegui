import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KEY_BACKSPACE, KEYBOARD_AZERTY, KEY_RETURN } from '../../model'
import Keyboard from './Keyboard'

test.each([[KEYBOARD_AZERTY]])(
  'keyboard renders correctly',
  (keys: string[][]) => {
    render(<Keyboard keys={keys} />)

    keys.forEach(row => {
      row.forEach(key => {
        if (key === KEY_BACKSPACE || key === KEY_RETURN) {
          return
        }
        const kk = screen.getByText(new RegExp(key, 'i'))

        expect(kk).toBeInTheDocument()
      })
    })
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

  userEvent.click(screen.getByTestId('keyboard-key-A'))

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

  userEvent.click(screen.getByTestId(`keyboard-key-${KEY_BACKSPACE}`))

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

  userEvent.click(screen.getByTestId(`keyboard-key-${KEY_RETURN}`))

  expect(mockHandleOnLetterClick).toBeCalledTimes(0)
  expect(mockHandleOnBackspaceClick).toBeCalledTimes(0)
  expect(mockHandleOnReturnClick).toBeCalledTimes(1)
})

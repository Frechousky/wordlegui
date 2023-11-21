import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorAlert from './ErrorAlert'

const MESSAGE = 'Error happened'

it('renders correctly', () => {
  render(<ErrorAlert message={MESSAGE} onClose={() => {}} />)

  const errorAlert = screen.queryByRole('alert')

  expect(errorAlert).toBeInTheDocument()
  expect(errorAlert).toBeVisible()

  const errorMessage = screen.queryByText(MESSAGE)

  expect(errorMessage).toBeInTheDocument()
  expect(errorMessage).toBeVisible()

  const closeButton = screen.queryByTitle('Close')

  expect(closeButton).toBeInTheDocument()
  expect(closeButton).toBeVisible()
})

it('calls onclose handler when clicking close button', () => {
  const onClose = jest.fn()

  render(<ErrorAlert message={MESSAGE} onClose={onClose} />)

  userEvent.click(screen.getByTitle('Close'))

  expect(onClose).toBeCalledTimes(1)
})

it('calls onclose handler when user press escape', () => {
  const onClose = jest.fn()

  render(<ErrorAlert message={MESSAGE} onClose={onClose} />)

  fireEvent.keyDown(screen.getByRole('alert'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27
  })

  expect(onClose).toBeCalledTimes(1)
})
import { render, screen } from '@testing-library/react'
import ErrorPanel from './ErrorPanel'

test('renders error message', () => {
  const message = 'Error happened'
  render(<ErrorPanel message={message} onClose={() => {}} />)

  const errorPanel = screen.getByText(message)

  expect(errorPanel).toBeVisible()
})

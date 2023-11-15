import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders correctly', () => {
  const title = 'My title'
  render(<Header title={title} />)

  const headerTitle = screen.getByText(title)

  expect(headerTitle).toBeVisible()
})

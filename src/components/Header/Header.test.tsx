import { render, screen } from '@testing-library/react'
import { GAME_TITLE } from '../../constants'
import Header from './Header'

it('renders correctly', () => {
  render(<Header />)

  const headerTitle = screen.getByText(GAME_TITLE)

  expect(headerTitle).toBeVisible()
})

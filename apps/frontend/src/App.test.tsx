import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the app title and roadmap section', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Dating App AI' })).toBeDefined()
    expect(screen.getByRole('heading', { name: 'Bootstrap roadmap' })).toBeDefined()
  })
})

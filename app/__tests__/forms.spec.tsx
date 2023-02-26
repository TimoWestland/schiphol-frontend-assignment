import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Select } from '~/components/forms'

beforeEach(jest.clearAllMocks)

describe('Forms - Select', () => {
  it('should respond to change events', async () => {
    const mockOnChange = jest.fn()
    userEvent.setup()

    render(
      <Select name="test" label="Test" onChange={mockOnChange}>
        <option value="opt-1">Option 1</option>
        <option value="opt-2">Option 2</option>
        <option value="opt-3">Option 3</option>
      </Select>,
    )

    expect(screen.getAllByRole('option')).toHaveLength(3)

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Test' }),
      screen.getByRole('option', { name: 'Option 2' }),
    )

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'opt-2' }),
      }),
    )
  })

  it('should render correctly with an error', () => {
    render(
      <Select
        id="test"
        name="test"
        label="Test"
        error="Please select an option"
      >
        <option value="opt-1">Option 1</option>
        <option value="opt-2">Option 2</option>
        <option value="opt-3">Option 3</option>
      </Select>,
    )

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-describedby',
      'test-error',
    )
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please select an option',
    )
  })
})

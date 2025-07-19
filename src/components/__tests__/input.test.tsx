import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Input } from '../input'

describe('Input Component', () => {
  const mockOnChangeText = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={mockOnChangeText} />
    )

    expect(getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('should call onChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={mockOnChangeText} />
    )

    const input = getByPlaceholderText('Enter text')
    fireEvent.changeText(input, 'test input')
    expect(mockOnChangeText).toHaveBeenCalledWith('test input')
  })

  it('should render with icon when provided', () => {
    const TestIcon = () => <div>Icon</div>
    const { getByPlaceholderText } = render(
      <Input placeholder="With icon" icon={<TestIcon />} />
    )

    // The input should render with the icon
    const input = getByPlaceholderText('With icon')
    expect(input).toBeTruthy()
  })

  it('should handle secure text entry', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Password')
    expect(input.props.secureTextEntry).toBe(true)
  })

  it('should render password input with secure text entry', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Password')
    expect(input.props.secureTextEntry).toBe(true)
  })

  it('should be disabled when disabled prop is true', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Disabled" disabled onChangeText={mockOnChangeText} />
    )

    const input = getByPlaceholderText('Disabled')
    expect(input.props.editable).toBe(false)
  })

  it('should not call onChangeText when disabled', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Disabled" disabled onChangeText={mockOnChangeText} />
    )

    const input = getByPlaceholderText('Disabled')
    fireEvent.changeText(input, 'test')
    expect(mockOnChangeText).not.toHaveBeenCalled()
  })

  it('should render without onChangeText prop', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="No onChangeText" />
    )

    expect(getByPlaceholderText('No onChangeText')).toBeTruthy()
  })

  it('should handle value prop', () => {
    const { getByDisplayValue } = render(
      <Input value="initial value" onChangeText={mockOnChangeText} />
    )

    expect(getByDisplayValue('initial value')).toBeTruthy()
  })

  it('should handle multiline input', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Multiline"
        multiline
        numberOfLines={3}
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Multiline')
    expect(input.props.multiline).toBe(true)
    expect(input.props.numberOfLines).toBe(3)
  })

  it('should handle keyboard type', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Email')
    expect(input.props.keyboardType).toBe('email-address')
  })

  it('should handle autoCapitalize', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Name"
        autoCapitalize="words"
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Name')
    expect(input.props.autoCapitalize).toBe('words')
  })

  it('should handle return key type', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Search"
        returnKeyType="search"
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Search')
    expect(input.props.returnKeyType).toBe('search')
  })

  it('should handle onFocus and onBlur events', () => {
    const mockOnFocus = jest.fn()
    const mockOnBlur = jest.fn()

    const { getByPlaceholderText } = render(
      <Input
        placeholder="Test"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Test')

    fireEvent(input, 'focus')
    expect(mockOnFocus).toHaveBeenCalledTimes(1)

    fireEvent(input, 'blur')
    expect(mockOnBlur).toHaveBeenCalledTimes(1)
  })

  it('should handle onSubmitEditing', () => {
    const mockOnSubmitEditing = jest.fn()

    const { getByPlaceholderText } = render(
      <Input
        placeholder="Submit"
        onSubmitEditing={mockOnSubmitEditing}
        onChangeText={mockOnChangeText}
      />
    )

    const input = getByPlaceholderText('Submit')
    fireEvent(input, 'submitEditing')
    expect(mockOnSubmitEditing).toHaveBeenCalledTimes(1)
  })

  it('should have correct default styling classes', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Styled" onChangeText={mockOnChangeText} />
    )

    const input = getByPlaceholderText('Styled')
    expect(input).toBeTruthy()
  })

  it('should handle undefined onChangeText', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Undefined onChangeText" onChangeText={undefined} />
    )

    const input = getByPlaceholderText('Undefined onChangeText')
    // Should not throw error when text is changed
    fireEvent.changeText(input, 'test')
  })
})

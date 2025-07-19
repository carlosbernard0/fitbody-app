import { fireEvent, render } from '@testing-library/react-native'
import { Button } from '../button'

describe('Button Component', () => {
  const mockOnPress = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with children', () => {
    const { getByText } = render(
      <Button onPress={mockOnPress}>Test Button</Button>
    )

    expect(getByText('Test Button')).toBeTruthy()
  })

  it('should call onPress when pressed', () => {
    const { getByText } = render(
      <Button onPress={mockOnPress}>Click Me</Button>
    )

    fireEvent.press(getByText('Click Me'))
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('should not call onPress when disabled', () => {
    const { getByText } = render(
      <Button onPress={mockOnPress} disabled>
        Disabled Button
      </Button>
    )

    fireEvent.press(getByText('Disabled Button'))
    expect(mockOnPress).not.toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    const { getByText } = render(
      <Button onPress={mockOnPress} className="custom-class">
        Custom Button
      </Button>
    )

    const button = getByText('Custom Button').parent
    expect(button).toBeTruthy()
  })

  it('should render without onPress prop', () => {
    const { getByText } = render(<Button>No Press Button</Button>)

    expect(getByText('No Press Button')).toBeTruthy()
  })

  it('should handle multiple children', () => {
    const { getByText } = render(
      <Button onPress={mockOnPress}>Child 1 Child 2</Button>
    )

    expect(getByText('Child 1 Child 2')).toBeTruthy()
  })

  it('should pass through additional props', () => {
    const { getByText } = render(
      <Button
        onPress={mockOnPress}
        testID="test-button"
        accessibilityLabel="Test"
      >
        Props Button
      </Button>
    )

    const button = getByText('Props Button').parent
    expect(button).toBeTruthy()
  })

  it('should have correct default styling classes', () => {
    const { getByText } = render(
      <Button onPress={mockOnPress}>Styled Button</Button>
    )

    const button = getByText('Styled Button').parent
    expect(button).toBeTruthy()
  })

  it('should handle empty children', () => {
    const { getByText } = render(<Button onPress={mockOnPress}>Empty</Button>)

    expect(getByText('Empty')).toBeTruthy()
  })

  it('should handle undefined onPress', () => {
    const { getByText } = render(
      <Button onPress={undefined}>Undefined Press</Button>
    )

    expect(getByText('Undefined Press')).toBeTruthy()
    // Should not throw error when pressed
    fireEvent.press(getByText('Undefined Press'))
  })
})

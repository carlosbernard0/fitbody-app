import { fireEvent, render } from '@testing-library/react-native'
import Home from '../index'

// Mock do expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}))

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const { getByText } = render(<Home />)

    expect(getByText('Hello Template')).toBeTruthy()
    expect(getByText('is okay baby')).toBeTruthy()
    expect(getByText('go to login')).toBeTruthy()
  })

  it('should navigate to login when button is pressed', () => {
    const { getByText } = render(<Home />)
    const { router } = require('expo-router')

    const loginButton = getByText('go to login')
    fireEvent.press(loginButton)

    expect(router.push).toHaveBeenCalledWith('/login')
  })

  it('should have correct styling classes', () => {
    const { getByText } = render(<Home />)

    const container = getByText('Hello Template').parent
    expect(container).toBeTruthy()
  })

  it('should render all text elements', () => {
    const { getByText } = render(<Home />)

    const elements = ['Hello Template', 'is okay baby', 'go to login']

    elements.forEach(element => {
      expect(getByText(element)).toBeTruthy()
    })
  })

  it('should handle multiple button presses', () => {
    const { getByText } = render(<Home />)
    const { router } = require('expo-router')

    const loginButton = getByText('go to login')

    // Press multiple times
    fireEvent.press(loginButton)
    fireEvent.press(loginButton)
    fireEvent.press(loginButton)

    expect(router.push).toHaveBeenCalledTimes(3)
    expect(router.push).toHaveBeenCalledWith('/login')
  })
})

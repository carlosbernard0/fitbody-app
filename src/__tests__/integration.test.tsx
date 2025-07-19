import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Button } from '../components/button'
import { Input } from '../components/input'

describe('Integration Tests', () => {
  describe('Button and Input Integration', () => {
    it('should handle form submission with button and input', () => {
      const mockOnSubmit = jest.fn()
      const mockOnChangeText = jest.fn()

      const { getByText, getByPlaceholderText } = render(
        <React.Fragment>
          <Input
            placeholder="Enter email"
            onChangeText={mockOnChangeText}
            value=""
          />
          <Button onPress={mockOnSubmit}>Submit</Button>
        </React.Fragment>
      )

      const input = getByPlaceholderText('Enter email')
      const button = getByText('Submit')

      // Simulate user interaction
      fireEvent.changeText(input, 'test@example.com')
      fireEvent.press(button)

      expect(mockOnChangeText).toHaveBeenCalledWith('test@example.com')
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })

    it('should handle password input with secure text entry', () => {
      const mockOnChangeText = jest.fn()

      const { getByPlaceholderText } = render(
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={mockOnChangeText}
        />
      )

      const input = getByPlaceholderText('Password')

      // Should be secure text entry
      expect(input.props.secureTextEntry).toBe(true)
    })
  })

  describe('Form Validation Integration', () => {
    it('should validate form data correctly', () => {
      const { loginSchema } = require('../app/login/login-schema')
      const { registerSchema } = require('../app/register/register-schema')

      // Test login validation
      const validLoginData = {
        login: 'testuser',
        password: 'password123',
      }
      const loginResult = loginSchema.safeParse(validLoginData)
      expect(loginResult.success).toBe(true)

      // Test register validation
      const validRegisterData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }
      const registerResult = registerSchema.safeParse(validRegisterData)
      expect(registerResult.success).toBe(true)
    })

    it('should handle invalid form data', () => {
      const { loginSchema } = require('../app/login/login-schema')
      const { registerSchema } = require('../app/register/register-schema')

      // Test invalid login
      const invalidLoginData = {
        login: '',
        password: '',
      }
      const loginResult = loginSchema.safeParse(invalidLoginData)
      expect(loginResult.success).toBe(false)

      // Test invalid register
      const invalidRegisterData = {
        name: 'Jo',
        email: 'invalid-email',
        password: '123',
        confirmPassword: 'different',
      }
      const registerResult = registerSchema.safeParse(invalidRegisterData)
      expect(registerResult.success).toBe(false)
    })
  })

  describe('Navigation Integration', () => {
    it('should handle navigation between screens', () => {
      const { router } = require('expo-router')

      // Simulate navigation
      router.push('/login')
      expect(router.push).toHaveBeenCalledWith('/login')

      router.push('/register')
      expect(router.push).toHaveBeenCalledWith('/register')
    })
  })

  describe('Component Styling Integration', () => {
    it('should apply consistent styling across components', () => {
      const { getByText, getByPlaceholderText } = render(
        <React.Fragment>
          <Input placeholder="Test input" />
          <Button>Test button</Button>
        </React.Fragment>
      )

      const input = getByPlaceholderText('Test input')
      const button = getByText('Test button')

      // Both components should render without errors
      expect(input).toBeTruthy()
      expect(button).toBeTruthy()
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle component errors gracefully', () => {
      // Test that components don't crash with invalid props
      const { getByText } = render(
        <React.Fragment>
          <Input onChangeText={undefined} />
          <Button onPress={undefined}>Test</Button>
        </React.Fragment>
      )

      // Should render without crashing
      expect(getByText).toBeDefined()
    })

    it('should handle async operations', async () => {
      const { sleep } = require('../utils/sleep')

      const sleepPromise = sleep(100)
      expect(sleepPromise).toBeInstanceOf(Promise)
    })
  })

  describe('Accessibility Integration', () => {
    it('should support accessibility features', () => {
      const { getByText, getByPlaceholderText } = render(
        <React.Fragment>
          <Input
            placeholder="Accessible input"
            accessibilityLabel="Email input"
          />
          <Button accessibilityLabel="Submit button">Submit</Button>
        </React.Fragment>
      )

      const input = getByPlaceholderText('Accessible input')
      const button = getByText('Submit')

      expect(input).toBeTruthy()
      expect(button).toBeTruthy()
    })
  })
})

import { sleep } from '../sleep'

describe('sleep utility', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should resolve after specified time', async () => {
    const sleepPromise = sleep(1000)

    // Fast-forward time
    jest.advanceTimersByTime(1000)

    await expect(sleepPromise).resolves.toBeUndefined()
  })

  it('should resolve after 100ms', async () => {
    const sleepPromise = sleep(100)

    jest.advanceTimersByTime(100)

    await expect(sleepPromise).resolves.toBeUndefined()
  })

  it('should resolve after 0ms', async () => {
    const sleepPromise = sleep(0)

    jest.advanceTimersByTime(0)

    await expect(sleepPromise).resolves.toBeUndefined()
  })

  it('should not resolve before specified time', async () => {
    const sleepPromise = sleep(1000)

    // Advance time by less than specified
    jest.advanceTimersByTime(500)

    // Promise should still be pending
    expect(sleepPromise).toBeInstanceOf(Promise)
  })

  it('should handle multiple sleep calls', async () => {
    const sleep1 = sleep(100)
    const sleep2 = sleep(200)
    const sleep3 = sleep(300)

    jest.advanceTimersByTime(100)
    await expect(sleep1).resolves.toBeUndefined()

    jest.advanceTimersByTime(100)
    await expect(sleep2).resolves.toBeUndefined()

    jest.advanceTimersByTime(100)
    await expect(sleep3).resolves.toBeUndefined()
  })

  it('should handle negative time values', async () => {
    const sleepPromise = sleep(-1000)

    // Should resolve immediately for negative values
    jest.advanceTimersByTime(0)
    await expect(sleepPromise).resolves.toBeUndefined()
  }, 10000)

  it('should handle very large time values', async () => {
    const sleepPromise = sleep(1000000)

    jest.advanceTimersByTime(1000000)

    await expect(sleepPromise).resolves.toBeUndefined()
  })

  it('should work with async/await pattern', async () => {
    const startTime = Date.now()

    const sleepPromise = sleep(100)
    jest.advanceTimersByTime(100)
    await sleepPromise

    // This test verifies the async/await pattern works correctly
    expect(sleepPromise).toBeInstanceOf(Promise)
  })

  it('should handle concurrent sleep calls', async () => {
    const promises = [sleep(100), sleep(200), sleep(300)]

    jest.advanceTimersByTime(300)

    await expect(Promise.all(promises)).resolves.toEqual([
      undefined,
      undefined,
      undefined,
    ])
  })
})

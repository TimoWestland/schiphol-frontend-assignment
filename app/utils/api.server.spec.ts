import { flights } from '../../data/flights.json'
import { getFlights } from '~/utils/api.server'
import { fetch } from '~/utils/fake-fetch.server'

jest.mock('~/utils/fake-fetch.server', () => {
  const actual = jest.requireActual('~/utils/fake-fetch.server')
  return {
    ...actual,
    __esModule: true,
    fetch: jest.fn(),
  }
})
const mockFetch = jest.mocked(fetch)

beforeEach(jest.clearAllMocks)

describe('API - getFlights', () => {
  it('should get flights', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(flights),
      }),
    )

    expect.assertions(3)

    await expect(getFlights()).resolves.toEqual(flights)

    expect(mockFetch).toHaveBeenCalledWith('https://some-api/flights', {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('should catch and log errors', async () => {
    console.error = jest.fn()

    mockFetch.mockImplementationOnce(() =>
      Promise.reject('Something went wrong'),
    )

    expect.assertions(4)

    // Get flights will still resolve instead of reject as
    // we don't re-throw the error in the catch block
    await expect(getFlights()).resolves.toEqual(undefined)

    expect(mockFetch).toHaveBeenCalledWith('https://some-api/flights', {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch flights. Error: Something went wrong',
    )
  })
})

import type { Flight } from '~/types'

import { fetch } from '~/utils/fake-fetch.server'

export async function getFlights(): Promise<Flight[] | undefined> {
  try {
    const response = await fetch('https://some-api/flights', {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
    return response.json()
  } catch (error: unknown) {
    console.error(`Failed to fetch flights. Error: ${error}`)
  }
}

export async function searchFlights(
  query: string,
): Promise<Flight[] | undefined> {
  try {
    const params = new URLSearchParams({ query })

    const response = await fetch(
      `https://some-api/flights?${params.toString()}`,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      },
    )
    return response.json()
  } catch (error: unknown) {
    console.error(
      `Failed to fetch flights for query: ${query}. Error: ${error}`,
    )
  }
}

export async function getFlightById(id: string): Promise<Flight | undefined> {
  try {
    const response = await fetch('https://some-api/flights', {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
    const flights = await response.json()
    // This would normally be a separate endpoint, but we'll mock it like this for now.
    return flights.find((f) => f.flightIdentifier === id)
  } catch (error: unknown) {
    console.error(`Failed to fetch flight for id ${id}. Error: ${error}`)
  }
}

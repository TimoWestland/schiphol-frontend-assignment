import type { Flight } from '~/types'

import fs from 'fs'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function mockFetch(url: string, options: any) {
  const raw = fs.readFileSync('./data/flights.json', 'utf-8')
  const data: { flights: Flight[] } = JSON.parse(raw)

  // Wait 50ms to simulate network latency of a real api call
  await wait(50)

  const { searchParams } = new URL(url)
  const query = searchParams.get('query')

  if (query && query.length > 2) {
    return data.flights.filter((flight) => flight.airport.includes(query))
  }

  return data.flights
}

export async function getFlights(): Promise<Flight[] | undefined> {
  try {
    return mockFetch('https://some-api/flights', {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
  } catch (error: unknown) {
    console.error(`Failed to fetch flights. Error: ${error}`)
  }
}

export async function searchFlights(
  query: string,
): Promise<Flight[] | undefined> {
  try {
    const params = new URLSearchParams({ query })

    return mockFetch(`https://some-api/flights?${params.toString()}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
  } catch (error: unknown) {
    console.error(
      `Failed to fetch flights for query: ${query}. Error: ${error}`,
    )
  }
}

export async function getFlightById(id: string): Promise<Flight | undefined> {
  try {
    const flights = await mockFetch('https://some-api/flights', {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    })
    // This would normally be a separate endpoint, but we'll mock it like this for now.
    return flights.find((f) => f.flightIdentifier === id)
  } catch (error: unknown) {
    console.error(`Failed to fetch flight for id ${id}. Error: ${error}`)
  }
}

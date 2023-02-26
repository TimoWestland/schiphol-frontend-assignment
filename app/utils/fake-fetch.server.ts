import fs from 'fs'

import { Flight } from '../../types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetch(
  url: string,
  options: any,
): Promise<{
  ok: boolean
  json: () => Promise<Flight[]>
}> {
  const raw = fs.readFileSync('./data/flights.json', 'utf-8')
  const data: { flights: Flight[] } = JSON.parse(raw)

  // Wait 50ms to simulate network latency of a real api call
  await wait(50)

  const { searchParams } = new URL(url)
  const query = searchParams.get('query')

  if (query && query.length > 2) {
    return {
      ok: true,
      json: async () =>
        data.flights.filter((flight) =>
          flight.airport.toLowerCase().includes(query.toLowerCase()),
        ),
    }
  }

  return { ok: true, json: async () => data.flights }
}

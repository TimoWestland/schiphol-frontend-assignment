import type { Flight } from '~/types'

import fs from 'fs'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getFlights(): Promise<Flight[]> {
  try {
    const raw = fs.readFileSync('./data/flights.json', 'utf-8')
    const data = JSON.parse(raw)

    // Wait 30ms to simulate network latency of a real api call
    await wait(30)

    return data.flights
  } catch (error: unknown) {
    // Re-throw the error so we can catch it higher up the tree
    throw new Error(`Error reading file from disk: ${error}`)
  }
}

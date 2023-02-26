import { Flight, SortDirection } from '../../types'

export function timeToDate(timestamp: string) {
  // Use today as the actual day/month doesn't matter in this use case.
  const now = new Date()
  const [hours, minutes] = timestamp.split(':')

  now.setHours(Number(hours))
  now.setMinutes(Number(minutes))
  now.setSeconds(0)

  return now
}

export function sortFlightsByTime(flights: Flight[], direction: SortDirection) {
  return flights.sort((flightA, flightB) => {
    const dateA = timeToDate(flightA.expectedTime)
    const dateB = timeToDate(flightB.expectedTime)

    if (direction === 'ascending') {
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0
    }

    if (direction === 'descending') {
      return dateB > dateA ? 1 : dateB < dateA ? -1 : 0
    }

    return 0
  })
}

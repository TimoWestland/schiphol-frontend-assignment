import { Flight, SortDirection } from '../../types'

function timeToDate(timestamp: string) {
  const now = new Date() // Just use today as the actual day doesn't matter in this use case
  const [hours, minutes] = timestamp.split(':')

  now.setHours(Number(hours))
  now.setMinutes(Number(minutes))
  now.setSeconds(0)

  return now
}

export function sortFlightsByTime(
  flightA: Flight,
  flightB: Flight,
  direction: SortDirection,
) {
  const dateA = timeToDate(flightA.expectedTime)
  const dateB = timeToDate(flightB.expectedTime)

  if (direction === 'ascending') {
    return dateA > dateB ? 1 : dateA < dateB ? -1 : 0
  }

  if (direction === 'descending') {
    return dateB > dateA ? 1 : dateB < dateA ? -1 : 0
  }

  return 0
}

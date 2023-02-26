import { flights } from '../../data/flights.json'
import { sortFlightsByTime, timeToDate } from '~/utils/sort'

describe('timeToDate', () => {
  it('should convert a 24h time string to a date object', () => {
    const date = timeToDate('15:50')
    expect(date).toBeInstanceOf(Date)
    expect(date.getHours()).toBe(15)
    expect(date.getMinutes()).toBe(50)
  })
})

describe('sortFlightsByTime', () => {
  it('should sort flights by time ascending', () => {
    const sortedFlights = sortFlightsByTime(flights, 'ascending')
    expect(sortedFlights[0].expectedTime).toBe('14:40')
    expect(sortedFlights[sortedFlights.length - 1].expectedTime).toBe('22:05')
  })

  it('should sort flights by time ascending', () => {
    const sortedFlights = sortFlightsByTime(flights, 'descending')
    expect(sortedFlights[0].expectedTime).toBe('22:05')
    expect(sortedFlights[sortedFlights.length - 1].expectedTime).toBe('14:40')
  })
})

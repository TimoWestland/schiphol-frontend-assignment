import * as React from 'react'

import { Link } from '@remix-run/react'

import { Flight } from '../../types'
import { Card } from '~/components/card'
import { Grid } from '~/components/grid'

function DelayedBadge() {
  return (
    <span className="radius-lg inline-block items-center rounded bg-red px-2 text-sm font-bold uppercase text-white">
      Delayed
    </span>
  )
}

type ItemProps = {
  flightNumber: string
  airport: string
  expectedTime: string
  originalTime: string
  url: string
}

function FlightListItem({
  flightNumber,
  airport,
  expectedTime,
  originalTime,
  url,
}: ItemProps) {
  const isDelayed = expectedTime !== originalTime

  return (
    <Card as="li" className="mb-6 last:mb-0">
      <Link to={url} className="group block p-8 text-blue-schiphol">
        <Grid nested>
          <div className="col-span-full border-b border-gray-scattered pb-2 lg:col-span-3 lg:border-r lg:border-b-0 lg:pb-0">
            {isDelayed ? (
              <div className="flex items-center gap-x-3">
                <span className="line-through">{originalTime}</span>
                <strong>{expectedTime}</strong>
                <DelayedBadge />
              </div>
            ) : (
              <strong>{originalTime}</strong>
            )}
          </div>
          <div className="col-span-full border-b border-gray-scattered py-2 lg:col-span-6 lg:border-r lg:border-b-0 lg:py-0">
            <strong className="group-hover:underline group-focus:underline">
              {airport}
            </strong>
          </div>
          <div className="col-span-full pt-2 lg:col-span-3 lg:pt-0">
            <span className="group-hover:underline group-focus:underline">
              {flightNumber}
            </span>
          </div>
        </Grid>
      </Link>
    </Card>
  )
}

export function FlightList({ flights }: { flights: Flight[] }) {
  return (
    <Grid>
      <ul className="col-span-full">
        {flights.map((flight) => (
          <FlightListItem key={flight.flightIdentifier} {...flight} />
        ))}
      </ul>
    </Grid>
  )
}

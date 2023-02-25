import * as React from 'react'

import { Link } from '@remix-run/react'

import clsx from 'clsx'

import { Flight } from '../../types'
import { Card } from '~/components/card'
import { Grid } from '~/components/grid'
import { IconArrowRight } from '~/components/icons'

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
    <Card as="li" className="mb-2 last:mb-0">
      <Link
        to={url}
        prefetch="intent"
        className="group block px-6 py-4 text-blue-schiphol lg:py-6"
      >
        <Grid nested>
          <div
            className={clsx(
              'col-span-full border-b border-dashed border-gray-overcast py-2',
              'lg:col-span-3 lg:border-r lg:border-b-0',
            )}
          >
            {isDelayed ? (
              <div className="flex items-center gap-x-3">
                <strong className="line-through">{originalTime}</strong>
                <strong className="text-red">{expectedTime}</strong>
              </div>
            ) : (
              <strong>{originalTime}</strong>
            )}
          </div>
          <div
            className={clsx(
              'col-span-full border-b border-dashed border-gray-overcast py-2',
              'lg:col-span-3 lg:border-r lg:border-b-0',
            )}
          >
            <strong className="block group-hover:underline group-focus:underline">
              {airport}
            </strong>
            <span className="group-hover:underline group-focus:underline">
              {flightNumber}
            </span>
          </div>
          <div className="col-span-full py-2 lg:col-span-3">
            {isDelayed ? <DelayedBadge /> : <span>On schedule</span>}
          </div>
          <div className="col-span-full py-2 text-right lg:col-span-3">
            <span className="inline-flex items-center gap-x-2 text-blue-afternoon">
              Details
              <IconArrowRight />
            </span>
          </div>
        </Grid>
      </Link>
    </Card>
  )
}

export function FlightList({ flights }: { flights: Flight[] }) {
  return (
    <ul>
      {flights.map((flight) => (
        <FlightListItem key={flight.flightIdentifier} {...flight} />
      ))}
    </ul>
  )
}

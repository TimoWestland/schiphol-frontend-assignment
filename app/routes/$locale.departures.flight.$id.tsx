import * as React from 'react'

import { DataFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Grid } from '~/components/grid'
import { H1 } from '~/components/typography'
import { getFlightById } from '~/utils/api.server'

export async function loader({ params }: DataFunctionArgs) {
  if (!params.id) {
    throw new Error('No Flight ID provided')
  }

  const flight = await getFlightById(params.id)

  if (!flight) {
    return json({}, { status: 404 })
  }

  return json({ flight })
}

export default function FlightDetails() {
  const data = useLoaderData()

  return (
    <div className="py-20">
      <Grid>
        <div className="col-span-full">
          <H1>{data.flight.flightNumber}</H1>
          <strong className="block mt-4">{data.flight.expectedTime}</strong>
          <strong>{data.flight.airport}</strong>
        </div>
      </Grid>
    </div>
  )
}

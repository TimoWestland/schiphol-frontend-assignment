import * as React from 'react'

import { DataFunctionArgs, json, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Card } from '~/components/card'
import { Grid } from '~/components/grid'
import { H1 } from '~/components/typography'
import { getFlightById } from '~/utils/api.server'

export async function loader({ params }: DataFunctionArgs) {
  if (!params.id) {
    throw new Error('No Flight ID provided')
  }

  const flight = await getFlightById(params.id)

  if (!flight) {
    throw json({}, { status: 404 })
  }

  return json(
    { flight },
    {
      headers: {
        'Cache-Control': 'private, max-age=3600',
      },
    },
  )
}

export const meta: MetaFunction = ({ data }) => {
  if (data.flight) {
    return {
      title: data.flight.airport,
      description: `${data.flight.expectedTime} - ${data.flight.flightNumber}`,
    }
  } else {
    return {
      title: 'Flight not found',
    }
  }
}

export default function FlightDetails() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen bg-blue-light py-20">
      <Grid>
        <div className="col-span-full mb-8">
          <H1>{data.flight.airport}</H1>
        </div>
        <Card className="col-span-full lg:col-span-6 p-8">
          <strong className="block">{data.flight.expectedTime}</strong>
          <span>{data.flight.flightNumber}</span>
        </Card>
      </Grid>
    </main>
  )
}

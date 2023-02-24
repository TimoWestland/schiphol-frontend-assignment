import * as React from 'react'

import { ActionFunction, json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'

import { Flight, SortDirection } from '../../types'
import { FlightList } from '~/components/flights'
import { ErrorPanel, Select } from '~/components/forms'
import { Grid } from '~/components/grid'
import { HeaderSection } from '~/components/header-section'
import { Searchbar } from '~/components/searchbar'
import { getFlights, searchFlights } from '~/utils/api.server'
import { sortFlightsByTime } from '~/utils/sort'

export async function loader() {
  const flights = await getFlights()

  // Sort flights by expected departure time by default as it's the default option in the select input
  const sortedFlights = (flights || []).sort((a, b) =>
    sortFlightsByTime(a, b, 'descending'),
  )

  return json(
    {
      flights: sortedFlights,
    },
    {
      headers: {
        'Cache-Control': 'private, max-age=3600',
      },
    },
  )
}

type ActionData = {
  status: 'success' | 'error'
  flights?: Flight[]
  fields: {
    query?: string | null
  }
  errors: {
    generalError?: string
    query?: string | null
  }
}

export const action: ActionFunction = async ({ request }) => {
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const query = form.get('query')
  const sortDirection =
    (form.get('sortDirection') as SortDirection) ?? 'ascending'

  let actionData: ActionData = {
    status: 'success',
    fields: { query },
    errors: {},
  }

  try {
    // Validate the input. Return an invalid request response (400) if it's not correct.
    if (typeof query !== 'string' || query.length < 3) {
      actionData.status = 'error'
      actionData.errors = {
        query:
          'Please enter a destination longer than two characters to search.',
      }
      return json(actionData, 400)
    }
    const flights = await searchFlights(query)
    actionData.flights = (flights || []).sort((a, b) =>
      sortFlightsByTime(a, b, sortDirection),
    )
    actionData.flights = flights
    return json(actionData, 200)
  } catch (error: unknown) {
    actionData.status = 'error'
    actionData.errors.generalError =
      'Oops! Something went wrong searching for your flights.'
    return json(actionData, 500)
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const flightsFetcher = useFetcher<ActionData>()

  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>('ascending')

  // Grab the flights returned from the form submit action if they are available
  // if not, default to the full list of flights from the loader
  const flights =
    flightsFetcher.data?.status === 'success' && flightsFetcher.data?.flights
      ? flightsFetcher.data?.flights
      : data.flights

  // We could add a loader when flightsFetcher.state = submitting, but since
  // the data is local it will be practically invisible
  return (
    <main>
      <flightsFetcher.Form method="post" aria-describedby="form-error">
        <HeaderSection>
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <Select
              className="w-full max-w-xs"
              label="Sort flights by departure time"
              name="sortDirection"
              defaultValue={sortDirection}
              onChange={(event) =>
                setSortDirection(event.target.value as SortDirection)
              }
            >
              <option value="ascending">Departure time: ascending</option>
              <option value="descending">Departure time: descending</option>
            </Select>
            <Searchbar error={flightsFetcher.data?.errors.query} />
          </div>
        </HeaderSection>
        <div className="min-h-[70vh] bg-blue-light py-10 lg:py-16">
          <Grid>
            {flights?.length === 0 ? (
              <p className="col-span-full text-3xl font-medium">
                No flights found{' '}
                {flightsFetcher.data?.status === 'success'
                  ? ` for "${flightsFetcher.data?.fields.query}"`
                  : ''}
              </p>
            ) : (
              <FlightList
                flights={flights.sort((a, b) =>
                  sortFlightsByTime(a, b, sortDirection),
                )}
              />
            )}
            {flightsFetcher.data?.status === 'error' &&
            flightsFetcher.data?.errors.generalError ? (
              <ErrorPanel className="col-span-full lg:col-span-7">
                {flightsFetcher.data.errors.generalError}
              </ErrorPanel>
            ) : null}
          </Grid>
        </div>
      </flightsFetcher.Form>
    </main>
  )
}

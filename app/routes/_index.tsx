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

  return json(
    { flights: flights ?? [] },
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
  const form = await request.formData()
  const query = form.get('query')
  const sortDirection =
    (form.get('sortDirection') as SortDirection) ?? 'ascending'

  let actionData: ActionData = {
    status: 'success',
    // Form fields can also be of type File, so we need to check if it's a  string to satisfy TS here.
    fields: { query: typeof query === 'string' ? query : '' },
    errors: {},
  }

  try {
    // Validate the input and return an invalid request response (400) if it's not valid.
    if (typeof query !== 'string' || query.length < 3) {
      actionData.status = 'error'
      actionData.errors = {
        query:
          'Please enter a destination longer than two characters to search.',
      }
      return json(actionData, 400)
    }

    const flights = await searchFlights(query)
    actionData.flights = (flights || [])
      .sort((a, b) => sortFlightsByTime(a, b, sortDirection))
      .slice(0, 5) // Limit to 5 results

    return json(actionData, 200)
  } catch (error: unknown) {
    actionData.status = 'error'
    actionData.errors.generalError = 'Sorry, something went wrong!'
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

  // We could add a loader when flightsFetcher.state === 'submitting', but since
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
            <div className="col-span-full">
              {flights.length === 0 ? (
                <p className="text-3xl font-medium">
                  No flights found{' '}
                  {flightsFetcher.data?.status === 'success'
                    ? ` for "${flightsFetcher.data?.fields.query}"`
                    : ''}
                </p>
              ) : (
                <>
                  {flightsFetcher.data?.fields.query ? (
                    <span className="mb-8 block text-3xl font-bold text-gray-storm">
                      {flights.length} flights found for "
                      {flightsFetcher.data?.fields.query}"
                    </span>
                  ) : null}
                  <FlightList
                    flights={flights.sort((a, b) =>
                      sortFlightsByTime(a, b, sortDirection),
                    )}
                  />
                </>
              )}
            </div>
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

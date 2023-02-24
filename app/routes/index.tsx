import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { FlightList } from '~/components/flights'
import { HeaderSection } from '~/components/header-section'
import { getFlights } from '~/utils/api.server'

export async function loader() {
  const flights = await getFlights()

  return json(
    { flights },
    {
      headers: {
        'Cache-Control': 'private, max-age=3600',
      },
    },
  )
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  console.log({ data })

  return (
    <main>
      <HeaderSection />
      <div className="bg-blue-light py-16">
        <FlightList flights={data.flights} />
      </div>
    </main>
  )
}

import * as React from 'react'

import { Grid } from '~/components/grid'
import { H1 } from '~/components/typography'

export function HeaderSection() {
  return (
    <header className="py-20 border-b border-gray-scattered">
      <Grid>
        <div className="col-span-full">
          <H1>Find your flight</H1>
        </div>
      </Grid>
    </header>
  )
}

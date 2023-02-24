import * as React from 'react'

import { Grid } from '~/components/grid'
import { H1 } from '~/components/typography'

export function HeaderSection({ children }: { children?: React.ReactNode }) {
  return (
    <header className="py-8 lg:py-20">
      <Grid>
        <div className="col-span-full mb-8 lg:mb-12">
          <H1>Find your flight</H1>
        </div>
        {children ? (
          <div className="col-span-full lg:col-span-9">{children}</div>
        ) : null}
      </Grid>
    </header>
  )
}

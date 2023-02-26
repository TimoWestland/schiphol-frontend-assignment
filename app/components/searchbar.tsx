import * as React from 'react'

import clsx from 'clsx'

import { Field } from '~/components/forms'
import { IconSearch } from '~/components/icons'

export function Searchbar({ error }: { error?: string | null }) {
  return (
    <div className="relative w-full">
      <Field
        type="search"
        name="query"
        autoComplete="off"
        label="Enter your destination"
        placeholder="Enter your destination"
        error={error}
      />
      <button
        className={clsx(
          'absolute top-[1px] right-[1px] h-[52px] w-[52px]',
          'flex items-center justify-center text-blue-afternoon transition',
          'bg-white hover:bg-blue-afternoon hover:text-white focus:bg-blue-afternoon focus:text-white',
        )}
        type="submit"
      >
        <span className="sr-only">Search</span>
        <IconSearch />
      </button>
    </div>
  )
}

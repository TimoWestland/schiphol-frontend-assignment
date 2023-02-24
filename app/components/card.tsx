import * as React from 'react'

import clsx from 'clsx'

export function Card({
  children,
  as: Tag = 'div',
  className,
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
}) {
  return (
    <Tag
      className={clsx(
        'bg-white shadow hover:shadow-lg focus:shadow-lg transition',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

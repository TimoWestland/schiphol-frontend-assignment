import * as React from 'react'

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="bg-gradient-at-schiphol bg-clip-text text-5xl lg:text-7xl font-bold leading-none text-transparent">
      {children}
    </h1>
  )
}

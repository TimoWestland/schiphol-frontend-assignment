import type { LinksFunction, MetaFunction } from '@remix-run/node'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { Navbar } from '~/components/navbar'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Schiphol Assignment',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Neue-Frutiger-Regular.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Neue-Frutiger-Medium.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Neue-Frutiger-Bold.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: appStyles },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

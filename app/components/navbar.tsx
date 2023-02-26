import * as React from 'react'

import { Link } from '@remix-run/react'

function Logo() {
  return (
    <svg width="95" height="25" viewBox="0 0 265 70" role="img">
      <path
        fill="#0d0a52"
        d="M56.9,46.9c-5.5,0-8.2-4.1-8.3-10.2s3.2-9.8,8.1-9.9a17.3,17.3,0,0,1,7,1.8l1-9.4a36.3,36.3,0,0,0-9.8-1.4c-5.7,0-10.2,2.1-13.2,5.5s-4.5,8.2-4.6,13.4h0c0,5.5,1.5,10.3,4.6,13.8S49.3,56,55.2,56h0c4,0,7.9-.5,10.1-1.4l-.5-9.8C62.4,45.7,59.8,46.9,56.9,46.9ZM22.5,26.8c-2.6-1.1-5.1-1.9-6.9-2.9s-2.7-1.9-2.7-3.4h0a4.8,4.8,0,0,1,2-4.4A9.2,9.2,0,0,1,19.2,15c3.1,0,6.5,1,10.4,2.5l1.1-10a42.8,42.8,0,0,0-12.3-2A20.9,20.9,0,0,0,6.5,8.9C3.2,11.4,1,15.3,1,20.8H1c0,8.3,5.7,11.6,10.9,13.7l6.9,3c3.8,1.9,3.2,6.3.4,7.6a10.9,10.9,0,0,1-5,1.3c-3.4,0-6.9-1-11.4-3.5l-1.2,11A49.1,49.1,0,0,0,14.7,56h.1c4.8,0,9.4-1,12.9-3.4s5.7-7.1,5.7-11.8C33.4,32.8,27.7,28.9,22.5,26.8Zm220.1-3.9a20.7,20.7,0,0,0-27.2,0,19.7,19.7,0,0,0-5.5,14.2h0a19.6,19.6,0,0,0,5,13.4C218.2,53.9,223,56,229,56h0a18.9,18.9,0,0,0,14.1-5.5,19.6,19.6,0,0,0,5-13.4h0A19.7,19.7,0,0,0,242.6,22.9ZM235,43.6a7.1,7.1,0,0,1-9.8,2.2h0a5.8,5.8,0,0,1-2.2-2.2,15.6,15.6,0,0,1-1.6-7.6c0-4.8,2.5-9.2,7.6-9.2s7.6,4.3,7.6,9.3A14.9,14.9,0,0,1,235,43.6Zm-94.2,8.6a12.3,12.3,0,0,0,9.4,3.6,14.1,14.1,0,0,0,12.1-5.9c2.4-3.6,3.4-8.3,3.4-13.1h0c0-4.9-1-9.5-3.4-13S155.9,18,150.4,18a13.1,13.1,0,0,0-9.6,3.8V18.6H130.1V69h7.5a3.2,3.2,0,0,0,3.2-3.2ZM153,43.7c-1.1,2-2.5,3.2-5,3.2a5.7,5.7,0,0,1-5.3-3.2,14.5,14.5,0,0,1-1.6-6.8h0a12.5,12.5,0,0,1,1.7-6.8,6.5,6.5,0,0,1,5.3-3.2,5.5,5.5,0,0,1,5,3.3,15.5,15.5,0,0,1,1.4,6.7h0A15.7,15.7,0,0,1,153,43.7ZM119.4,55.2a3.2,3.2,0,0,0,3.2-3.2V18.6h-11V55.2ZM114.7,5.7c-1.7.4-3.1,1.5-3.1,3.2v5.9h11V4.1ZM256.1,2.4c-1.8.4-3.2,1.4-3.2,3.2V55.2h7.9A3.2,3.2,0,0,0,264,52h0V.8ZM93.2,35.5V55.2H101a3.2,3.2,0,0,0,3.2-3.2V32.3c0-4-.9-7.6-3-10.3s-5.4-4.3-9.7-4.3a14.8,14.8,0,0,0-10,3.9V1.1L73.7,2.7c-1.8.4-3.2,1.5-3.2,3.2V55.2h11V36.4a16,16,0,0,1,1.4-6.1,5.7,5.7,0,0,1,5.5-3.5c2.5.1,3.4,1,4.1,2.7A17.3,17.3,0,0,1,93.2,35.5Zm101,0V55.2h7.9a3.4,3.4,0,0,0,3.2-3.2V32.3c-.1-4-1-7.6-3.1-10.3s-5.4-4.3-9.7-4.3a14.5,14.5,0,0,0-9.9,3.9V1.1l-7.9,1.6c-1.8.4-3.2,1.5-3.2,3.2V55.2h11.1V36.4a14.3,14.3,0,0,1,1.4-6.1,5.9,5.9,0,0,1,5.4-3.5c2.5.1,3.4,1,4.1,2.7A17.3,17.3,0,0,1,194.2,35.5Z"
      />
    </svg>
  )
}

export function Navbar() {
  return (
    <nav className="border-b border-gray-scattered">
      <div className="mx-8vw py-6 lg:py-8">
        <div className="mx-auto flex max-w-5xl flex-col lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" prefetch="intent" title="home">
            <span className="sr-only">Schiphol logo</span>
            <Logo />
          </Link>
          <div className="mt-4 text-sm lg:mt-0">
            This is not an official Schiphol site. Please visit{' '}
            <a
              href="https://schiphol.nl/"
              className="font-bold text-blue-afternoon underline"
            >
              schiphol.nl
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

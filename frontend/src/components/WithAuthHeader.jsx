import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function WithAuthHeader() {
  return (
    <>
        <header>
            <h6>&langl;ChatApp&rangl;</h6>

            <Link to={"/chat"}>Chat</Link>
            <Link to={"/about"}>About</Link>
        </header>

        <Outlet/>
    </>
  )
}

export default WithAuthHeader
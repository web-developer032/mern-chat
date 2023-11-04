import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function WithoutAuthHeader() {
  return (
    <>
        <header>
            <h6>&langl;ChatApp&rangl;</h6>

            <Link to={"/signup"}>Signup</Link>
            <Link to={"/login"}>Login</Link>
        </header>

        <Outlet/>
    </>
  )
}

export default WithoutAuthHeader
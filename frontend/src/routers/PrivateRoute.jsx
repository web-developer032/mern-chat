import React from 'react'
import { Route } from 'react-router-dom'

function PrivateRoute({children,...props}) {
  return (
    <Route>
        {props.user ? children : <Redirect to="props"/>}
    </Route>
  )
}

export default PrivateRoute
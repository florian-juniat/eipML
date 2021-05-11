import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';


const PrivateRoute = ({ component: Component, token, ...rest }) => {

  // Add your own authentication on the below line.

  if (token == "") {
    console.log("===TEST TOKEN====")
    console.log(token)
  }

  var p = false

  return (
    <Route
      {...rest}
      render={props =>
        p == true ?
          <Component {...props} />
        : 
          <Redirect to="/signin" />
        
      }
    />
  )
}

export default PrivateRoute
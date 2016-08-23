import React from 'react'
import {render} from 'react-dom'
import App from './App'

if (document.getElementById("reactroot")) {
  render(
    <App />,
    document.getElementById('reactroot')
  )
}

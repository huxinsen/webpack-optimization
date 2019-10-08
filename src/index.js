import React from 'react'
import { render } from 'react-dom'
import './style.css'

import $ from 'jquery'
console.log('$', $)

render(<h1 className="title">hello</h1>, document.getElementById('root'))

import * as React from 'react'
import {render} from 'react-dom'
import {bindActionCreators} from 'redux'
import store from './store'
import Navigation from './views/Navigation'

import {
	creators as navActionCreators,
	NAVIGATE
} from './actions/NavigationActions'

document.addEventListener('DOMContentLoaded', function () {
	var navActions = bindActionCreators(navActionCreators, store.dispatch)

	// mount the navbar
	render( 
		React.createElement(Navigation, {}), 
		document.getElementById('navigation') 
	)

	navActions[NAVIGATE](
		window.location.pathname, 
		{replace: true}
	)

})

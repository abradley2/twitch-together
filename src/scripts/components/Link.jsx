import * as React from 'react'
import { bindActionCreators } from 'redux'
import store from '../store'
import {
	creators,
	NAVIGATE
} from '../actions/NavigationActions'

// intercept link click events to support pushState routing
// necessary because reacts event handlers do not handle
// preventDefault correctly
document.addEventListener('click', function (e) {
	var el = findParent('A', e.target)
	if (el && el.hasAttribute('data-link')) {
		e.preventDefault()
	}
})

function findParent (tagname, el) {
	if (el.tagName === tagname) {
		return el
	}
	while (el = el.parentNode) {
		if (el.tagName === tagname) {
			return el
		}
	}
	return null
}


export default function Link (props) {
	let actions = bindActionCreators(creators, store.dispatch)

	return <a
		{...props}
		onClick={e => {
			actions[NAVIGATE](
				props.href, 
				{replace: (props.replace === false) ? false : true}
			)
		}}
		data-link='true'
	>
		{props.children}
	</a>
}

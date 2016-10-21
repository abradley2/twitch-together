import * as React from 'react'
import store from '../store'
import { bindActionCreators } from 'redux'
import {
	creators,
	SET_LOCATION
} from '../actions/CurrentUserActions'

export default function AskLocation (props) {
	let actions = bindActionCreators(creators, store.dispatch)

	return (<div className='alert alert-info'>
		<p>
			It appears your account doesn't have a location associated with it
			yet. To help find you the best groups, please click the button below
			and then grant this application geolocation access. Your personal
			location info is not shared with other users.
		</p>
		<button
			className='btn btn-success'
			onClick={(e) => {
				navigator.geolocation.getCurrentPosition( actions[SET_LOCATION] )
			}}
		>
			Ask for location
		</button>
	</div>)

}

import * as React from 'react'
import { extend } from 'underscore'
import { bindActionCreators } from 'redux'
import store from '../store'
import View from '../utils/View'

import Link from '../components/Link'
import AskLocation from '../components/AskLocation'
import LoadingIndicator from '../components/LoadingIndicator'

import {
	creators,
	GET_CURRENT_USER
} from '../actions/CurrentUserActions'


function locationIsSet (position) {
	return !(position.get(0) === 0 && position.get(1) === 0)
}

export default class Home extends View {
	constructor (props) {
		super(props)
		this.actions = extend({},
			bindActionCreators(creators, store.dispatch)
		)
	}

	mountActions () {
		this.actions[GET_CURRENT_USER]()
	}

	render () {
		let CurrentUser = this.state.CurrentUser

		let ready = (
			CurrentUser.get('twitchId')
		)

		console.log(
			locationIsSet( CurrentUser.get('location') )
		)

		return (ready ? <div className='container'>
			<h3>{`Welcome, ${CurrentUser.get('twitchName')}`}</h3>
			{locationIsSet( CurrentUser.get('location') ) ? null : <AskLocation />}
		</div> : <LoadingIndicator />)
	}
}

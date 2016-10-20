import * as React from 'react'
import { extend } from 'underscore'
import { bindActionCreators } from 'redux'
import store from '../store'
import View from '../utils/View'

import Link from '../components/Link'
import LoadingIndicator from '../components/LoadingIndicator'

import {
	creators,
	GET_CURRENT_USER
} from '../actions/CurrentUserActions'

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

		return (ready ? <div className='container'>
			<h3>{`Welcome, ${CurrentUser.get('twitchName')}`}</h3>
		</div> : <LoadingIndicator />)
	}
} 
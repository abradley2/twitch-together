import * as React from 'react'
import store from '../store'
import View from '../utils/View'
import {bindActionCreators} from 'redux'
import {
	creators,
	LOGIN,
	LOGOUT
} from '../actions/CurrentUserActions'

import Link from '../components/Link'

export default class Auth extends View {

	constructor (props) {
		super(props)
		this.actions = bindActionCreators(creators, store.dispatch)

		console.log(store.getState().CurrentUser)

		if (!store.getState().CurrentUser.get('loginRequest').hasFetched) {
			this.actions[LOGIN]()
		}
	}

	render () {
		let props = this.props
		let actions = this.actions

		return <div>
			<h3>Auth</h3>
			<Link href='/app/home'>Home</Link>
		</div>
	}

}
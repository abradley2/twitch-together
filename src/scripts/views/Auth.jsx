import * as React from 'react'
import store from '../store'
import View from '../utils/View'
import {bindActionCreators} from 'redux'
import {
	creators,
	AUTHORIZE,
	LOGOUT
} from '../actions/CurrentUserActions'

import Link from '../components/Link'

export default class Auth extends View {

	constructor (props) {
		super(props)
		this.actions = bindActionCreators(creators, store.dispatch)
	}

	render () {
		let props = this.props
		let actions = this.actions
		let state = store.getState()

		if (!state.CurrentUser.get('session').loggedIn) {
			this.actions[AUTHORIZE]()
		}

		return <div>
			<h3>Auth</h3>
			<Link href='/app/home'>Home</Link>
		</div>
	}

}

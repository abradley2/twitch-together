import * as React from 'react'
import store from '../store'
import View from '../utils/View'
import router from '../router'
import {getQueryStringParam} from '../utils/fn'
import {bindActionCreators} from 'redux'
import {isUndefined} from 'underscore'
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
		this.actions[AUTHORIZE]()
	}

	render () {
		let CurrentUser = store.getState().CurrentUser.toJS()
		let props = this.props
		let actions = this.actions

		let session = CurrentUser.session
		let authorization = CurrentUser.authorization

		let ready = (
			!isUndefined(session)
			&& !isUndefined(authorization)
		)

		let code = getQueryStringParam('code')
		console.log('code = ',code)

		return (ready ? <div>
			<h3>Auth</h3>
			<a href={authorization.url}>Login with Twitch</a>
			<Link href='/app/home'>Home</Link>
		</div> : null)
	}

}

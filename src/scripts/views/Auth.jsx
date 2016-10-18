import * as React from 'react'
import store from '../store'
import View from '../utils/View'
import router from '../router'
import {getQueryStringParam} from '../utils/fn'
import {bindActionCreators} from 'redux'
import {isNull} from 'underscore'
import {
	creators,
	GET_AUTHORIZATION_URL,
	AUTHORIZE
} from '../actions/CurrentUserActions'

import Link from '../components/Link'

export default class Auth extends View {

	constructor (props) {
		super(props)
		
		this.actions = bindActionCreators(creators, store.dispatch)
		this.actions[GET_AUTHORIZATION_URL]()
	}

	render () {
		let CurrentUser = store.getState().CurrentUser
		let props = this.props
		let actions = this.actions

		let ready = (
			CurrentUser.get('authorizationUrl')
		)

		return (ready ? <div>
			<h3>Auth</h3>
			<a href={CurrentUser.get('authorizationUrl')}>
				<img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"/>
			</a>
			<Link href='/app'>Home</Link>
		</div> : null)
	}

}

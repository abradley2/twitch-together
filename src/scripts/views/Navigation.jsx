import * as React from 'react'
import { bindActionCreators } from 'redux'
import View from '../utils/View'
import store from '../store'
import {
	creators,
	LOGOUT
} from '../actions/TwitchAuthActions'

import Link from '../components/Link'

export default class Navigation extends View {

	constructor(props) {
		super(props)
		this.actions = bindActionCreators(creators, store.dispatch)
	}

	componentWillMount() {
		this.unsub = store.subscribe(() => {
			this.setState(store.getState())
		})
	}

	getNavbar() {
		let navs = [
			{url: '/app', title: 'Home'},
			{url: '/app/usergroups/', title: 'My Groups'},
			{url: '/app/usergroups/edit/new', title: '+New Group'},
		]

		return (<ul className='nav navbar-nav'>
			{navs.map((link, idx) => {
				return (<li key={idx.toString()}>
					<Link href={link.url}>
						{link.title}
					</Link>
				</li>)
			})}
		</ul>)
	}

	getRightNavbar() {

		return (<ul className='nav navbar-nav navbar-right'>
			<li>
				<Link href='/app/profile'>Profile</Link>
			</li>
			<li>
				<a
					style={{ cursor: 'pointer' }}
					href='javascript:void(0);'
					onClick={this.actions[LOGOUT]}
				>
					Logout
				</a>
			</li>
		</ul>)

	}

	render() {
		return (<div className='navbar navbar-default'>
			<div className='container-fluid'>
				<div className='navbar-header'>
					<button type='button' className='navbar-toggle collapsed'>
						<span className='icon-bar'></span>
						<span className='icon-bar'></span>
						<span className='icon-bar'></span>
					</button>
				</div>
				<div className='collapse navbar-collapse'>
					{this.getNavbar()}
					{this.getRightNavbar()}
				</div>
			</div>
		</div>)
	}
} 
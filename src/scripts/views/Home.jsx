import * as React from 'react'
import View from '../utils/View'

import Link from '../components/Link'

export default class Home extends View {
	constructor (props) {
		super(props)
	}

	render () {
		return <div>
			<h3>Home</h3>
			<Link href='/app/auth'>Auth</Link>
		</div>
	}
} 
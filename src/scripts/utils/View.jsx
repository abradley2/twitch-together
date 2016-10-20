import * as React from 'react'
import store from '../store'
import {defer} from 'underscore'

export default class View extends React.Component {
	constructor (props) {
		super(props)
		this.state = store.getState()
	}
	componentWillMount () {
		this.unsub = store.subscribe(() => {
			this.setState(store.getState())
		})
	}
	componentDidMount () {
		if (this.mountActions) {
			defer(() => {
				this.mountActions()
			})
		}
	}
	container (content) {
		return (<div className='container'>
			{content}
		</div>)
	}
	componentWillUnmount () {
		this.unsub()
	}
}

import * as React from 'react'
import store from '../store'

export default class View extends React.Component {
	constructor (props) {
		super(props)
		this.state = store.getState()
	}
	componentDidMount () {
		this.unsub = store.subscribe(() => {
			this.setState(store.getState())
		})
	}
	componentWillUnmount () {
		this.unsub()
	}
}

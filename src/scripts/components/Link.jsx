import * as React from 'react'
import router from '../router'

export default function Link (props) {
	return <a
		{...props}
		onClick={e => {
			router.navigate(props.href)
		}}
		data-link='true'
	>
		{props.children}
	</a>
}

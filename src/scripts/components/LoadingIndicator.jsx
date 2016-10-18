import * as React from 'react'

export default function LoadingIndicator (props) {
	
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

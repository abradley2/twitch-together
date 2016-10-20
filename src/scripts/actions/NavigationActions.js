import i40 from 'i40'

export const NAVIGATE = 'NavigationActions.NAVIGATE'

export const creators = {
	[NAVIGATE]: function (url, opts) {
		return {
			type: NAVIGATE,
			url: url,
			opts: opts 
		}
	}
}
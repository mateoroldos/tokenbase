export const getUserAccessToken = async (userAccessToken: string) => {
	const res = await fetch(
		`https://www.figma.com/api/oauth/token?client_id=MUp1X5gBBdwXRBQ27diZef&client_secret=VAUn3GIyrHhqqcO8MmfPe1M2UTfRdk&redirect_uri=https://app.token-base.com&code=${userAccessToken}&grant_type=authorization_code`,
		{
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		}
	)

	const response = await res.json()
	console.log(response)
	return response
}

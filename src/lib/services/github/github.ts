export const getGithubUserEmails = async (
	token: string
): Promise<GitHubUserEmail[]> => {
	console.log('getGithubUserEmails', token)

	const response = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	console.log('response', response)
	console.log('response.status', response.status)
	console.log('response.statusText', response.statusText)
	console.log('response.ok', response.ok)
	console.log('response.headers', response.headers)
	console.log('response.url', response.url)

	const emails: GitHubUserEmail[] = await response.json()

	console.log('emails', emails)

	return emails
}

interface GitHubUserEmail {
	email: string
	primary: boolean
	verified: boolean
	visibility: string
}

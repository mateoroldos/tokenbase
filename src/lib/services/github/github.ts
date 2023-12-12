export const getGithubUserEmails = async (
	token: string
): Promise<GitHubUserEmail[]> => {
	console.log('getGithubUserEmails', token)

	const response = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `token ${token}`
		}
	})

	console.log('response', response)

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

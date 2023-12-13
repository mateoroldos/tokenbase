export const getGithubUserEmails = async (
	token: string
): Promise<GitHubUserEmail[]> => {
	const response = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${token}`,
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	// log all headers
	for (const [key, value] of response.headers.entries()) {
		console.log(`${key}: ${value}`)
	}

	const emails: GitHubUserEmail[] = await response.json()

	return emails
}

interface GitHubUserEmail {
	email: string
	primary: boolean
	verified: boolean
	visibility: string
}

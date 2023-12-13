export const getGithubUserEmails = async (
	token: string
): Promise<GitHubUserEmail[]> => {
	const response = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	const emails: GitHubUserEmail[] = await response.json()

	return emails
}

interface GitHubUserEmail {
	email: string
	primary: boolean
	verified: boolean
	visibility: string
}

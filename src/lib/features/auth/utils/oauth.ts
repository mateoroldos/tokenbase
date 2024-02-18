import { OAuthRequestError } from '@lucia-auth/oauth'

// Taken from Lucia.
// Need it to make manual requests to some providers.
export async function handleRequest<T>(request: Request) {
	request.headers.set('User-Agent', 'lucia')
	request.headers.set('Accept', 'application/json')

	const response = await fetch(request)

	if (!response.ok) {
		throw new OAuthRequestError(request, response)
	}

	return (await response.json()) as T
}

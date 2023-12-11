import { TOKENBASE_API_URL } from '$env/static/private'

const sendEmail = async (email: string[], subject: string, html: string) => {
	const response = await fetch(`${TOKENBASE_API_URL}/resend`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, subject, html })
	})

	return response.json()
}

export default sendEmail

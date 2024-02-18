const sendEmail = async (
	email: string[],
	subject: string,
	html: string,
	appUrl: string
) => {
	const response = await fetch(`${appUrl}/api/resend`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, subject, html })
	})

	return response.json()
}

export default sendEmail

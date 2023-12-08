const sendEmail = async (email: string[], subject: string, html: string) => {
	const response = await fetch('/api/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, subject, html })
	})

	return response.json()
}

export default sendEmail

import { env } from '$env/dynamic/private'
import { json } from '@sveltejs/kit'

export const POST = async ({ request }) => {
	const body = await request.json()

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${env.SECRET_RESEND_API_KEY}`
		},
		body: JSON.stringify({
			from: 'Tokenbase <hello@token-base.com>',
			to: body.email,
			subject: body.subject,
			text: body.html
		})
	})

	if (res.ok) {
		const data = await res.json()
		return json(data)
	} else {
		console.error('Error sending email:', res.statusText)
		return json({ error: 'Error sending email' })
	}
}

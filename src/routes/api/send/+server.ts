import { env } from '$env/dynamic/private'
import { Resend } from 'resend'
import { json } from '@sveltejs/kit'

const resend = new Resend(env.SECRET_RESEND_API_KEY)

export const POST = async ({ request }) => {
	const body = await request.json()

	console.log(body)

	try {
		const data = await resend.emails.send({
			from: 'Tokenbase <hello@token-base.com>',
			to: body.email,
			subject: body.subject,
			text: body.html
		})

		console.log(data)

		return json(data)
	} catch (error) {
		return json({ error })
	}
}

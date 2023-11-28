import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(env.SECRET_SENDGRID_API_KEY)

export const sendEmailVerificationLink = async (
	token: string,
	formData: { username: string; email: string }
) => {
	let url: string
	let recipient: string

	if (dev) {
		url = `http://localhost:5173/email-verification/token/${token}`
		recipient = 'accounts@emestudio.dev'
	} else {
		url = `https://app.token-base.com/email-verification/token/${token}`
		recipient = formData.email
	}

	const msg = {
		to: recipient,
		from: 'Tokenbase Team <hello@token-base.com>',
		templateId: 'd-7ca589889fd24aa9a361c59de05be6d8',
		dynamicTemplateData: {
			username: formData.username,
			url
		}
	}

	sgMail
		.send(msg)
		.then(() => {
			console.log(`Email sent`)
		})
		.catch((error) => {
			console.error(error)
		})

	console.log(`Your email verification link: ${url}`)
}

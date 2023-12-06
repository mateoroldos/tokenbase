import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(env.SECRET_SENDGRID_API_KEY)

export const sendPasswordResetLink = async (token: string, email: string) => {
	let url: string
	let recipient: string

	if (dev) {
		url = `http://localhost:5173/password-reset/${token}`
		recipient = 'accounts@emestudio.dev'
	} else {
		url = `https://app.token-base.com/password-reset/${token}`
		recipient = email
	}

	const msg = {
		to: recipient,
		from: 'Tokenbase Team <hello@token-base.com>',
		templateId: 'd-46398bff7adb41f0a7ddcf4cfd6a53ed',
		dynamicTemplateData: {
			username: email,
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

	console.log(`Your password reset link: ${url}`)
}

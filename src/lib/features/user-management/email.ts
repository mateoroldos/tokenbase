import { env } from '$env/dynamic/private'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(env.SECRET_SENDGRID_API_KEY)

export const sendEmailVerificationLink = async (
	token: string,
	formData: { username: string; email: string }
) => {
	const url = `http://localhost:5173/email-verification/token/${token}`

	const msg = {
		to: 'accounts@emestudio.dev',
		from: 'Tokenbase Team <accounts@emestudio.dev>',
		templateId: 'd-7ca589889fd24aa9a361c59de05be6d8',
		dynamicTemplateData: {
			username: formData.username,
			url
		}
	}

	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent')
		})
		.catch((error) => {
			console.error(error)
		})

	console.log(`Your email verification link: ${url}`)
}

export const sendPasswordResetLink = async (
	token: string,
	formData: { username: string; email: string }
) => {
	const url = `http://localhost:5173/password-reset/${token}`

	const msg = {
		to: 'accounts@emestudio.dev',
		from: 'Tokenbase Team <accounts@emestudio.dev>',
		templateId: 'd-46398bff7adb41f0a7ddcf4cfd6a53ed',
		dynamicTemplateData: {
			username: formData.username,
			url
		}
	}

	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent')
		})
		.catch((error) => {
			console.error(error)
		})

	console.log(`Your password reset link: ${url}`)
}

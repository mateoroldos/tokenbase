import { dev } from '$app/environment'
import sendEmail from '$lib/services/email/sendEmail'

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

	await sendEmail(
		[recipient],
		'Tokenbase Email Verification',
		`Your password reset link: ${url}`
	)
}

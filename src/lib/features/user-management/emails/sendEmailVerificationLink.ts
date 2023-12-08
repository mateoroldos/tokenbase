import { dev } from '$app/environment'
import sendEmail from '$lib/services/email/email'

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

	await sendEmail(
		[recipient],
		'Tokenbase Email Verification',
		`Your email verification link: ${url}`
	)

	console.log(`Your email verification link: ${url}`)
}

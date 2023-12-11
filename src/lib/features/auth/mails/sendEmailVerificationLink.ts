import { dev } from '$app/environment'
import sendEmail from '$lib/services/email/sendEmail'

export const sendEmailVerificationLink = async (
	token: string,
	email: string
) => {
	let url: string
	let recipient: string

	if (dev) {
		url = `http://localhost:5173/email-verification/token/${token}`
		recipient = 'accounts@emestudio.dev'
	} else {
		url = `https://app.token-base.com/email-verification/token/${token}`
		recipient = email
	}

	console.log('bala')

	await sendEmail(
		[recipient],
		'Tokenbase Email Verification Link',
		`Your email verification link: ${url}`
	)
}

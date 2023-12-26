import sendEmail from '$lib/services/email/sendEmail'

export const sendEmailVerificationLink = async (
	token: string,
	email: string,
	appUrl: string
) => {
	await sendEmail(
		[email],
		'Tokenbase Email Verification Link',
		`Your email verification link: ${appUrl}/email-verification/token/${token}`,
		appUrl
	)
}

import sendEmail from '$lib/services/email/sendEmail'

export const sendPasswordResetLink = async (
	token: string,
	email: string,
	appUrl: string
) => {
	await sendEmail(
		[email],
		'Tokenbase Reset Password Link',
		`Your password reset link: ${appUrl}/password-reset/${token}`,
		appUrl
	)
}

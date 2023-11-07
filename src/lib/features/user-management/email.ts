export const sendEmailVerificationLink = async (token: string) => {
	const url = `http://localhost:5174/email-verification/${token}`
	console.log(`Your email verification link: ${url}`)
}

export const sendPasswordResetLink = async (token: string) => {
	const url = `http://localhost:5173/password-reset/${token}`
	console.log(`Your password reset link: ${url}`)
}
